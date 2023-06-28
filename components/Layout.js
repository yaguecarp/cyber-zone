import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import Link from "next/link";
import SendMessage from "./SendMessage";
import { SystemGPT } from "./SystemPromptGPT";
import { OpenAIClient } from "openai-fetch";
import Image from "next/image";
import { UserContext } from "./UserContext";

export default function Layout({ children }) {
  const { userType, setUserType } = useContext(UserContext);

  const [openChat, setOpenChat] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const [games, setGames] = useState([]);
  const [gamesFilter, setGamesFilter] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // console.log("API KEY", process.env.RAWG_API_KEY);

  console.log("USER TYPE:", userType);


  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      });
  }, []);
  // console.log(games);

  console.log(games)

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    if (e.target.value === "") {
      setGamesFilter([]);
    }
  };

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = games.filter((game) => {
      if (
        game.name
          .toString()
          .toLowerCase()
          .startsWith(terminoBusqueda.toLowerCase())
      ) {
        return game;
      }
    });

    if (resultadoBusqueda.length == 0) {
      resultadoBusqueda = games.filter((game) => {
        if (
          game.name
            .toString()
            .toLowerCase()
            .includes(terminoBusqueda.toLowerCase())
        ) {
          return game;
        }
      });
      let sortedGames = resultadoBusqueda
        .slice(0, 4)
        .sort((g1, g2) => (g1.slug > g2.slug ? 1 : g1.slug < g2.slug ? -1 : 0));
      setGamesFilter(sortedGames);
    }
    let sortedGames = resultadoBusqueda
      .slice(0, 4)
      .sort((g1, g2) => (g1.slug > g2.slug ? 1 : g1.slug < g2.slug ? -1 : 0));
    setGamesFilter(sortedGames);
  };

  const [chatHistory, setChatHistory] = useState([
    {
      content: SystemGPT,
      message: `Hola! Mi nombre es CyberBot y puedo ayudarte con dudas puntuales
      que tengas de tus juegos favoritos!
      Decime, en que puedo ayudar?`,
      sender: "CyberBot",
      role: "system",
    },
  ]);

  const [message, setMessage] = useState("");
  const client = new OpenAIClient({
    // apiKey: "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",
  });

  async function completion(messages) {
    console.log("GPT: " + JSON.stringify(messages));
    const completion = await client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.6,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log("respuesta" + JSON.stringify(completion));

    if (!completion.response.usage) {
      return {
        text: completion.response.choices[0].message?.content || "",
        tokens: 0,
      };
    }

    return {
      text: completion.response.choices[0].message?.content || "",
      tokens: completion.response.usage.total_tokens,
    };
  }

  const sendMessage = () => {
    setChatHistory([
      ...chatHistory,
      {
        content: message,
        message: message,
        sender: "Usuario",
        role: "user",
      },
    ]);

    getOpenaiResponse(message);
  };

  console.log(chatHistory);
  const getOpenaiResponse = async (
    userMessage,
    intentos = 1,
    validaciones = null
  ) => {
    setIsLoading(true);

    if (userMessage == "") return;
    let prevMessages = [];
    chatHistory.forEach((message) => {
      prevMessages = [
        ...prevMessages,
        { role: message.role, content: message.content },
      ];
    });

    prevMessages = [...prevMessages, { role: "user", content: userMessage }];
    if (validaciones !== null) {
      validaciones.forEach((validacion) => {
        prevMessages = [
          ...prevMessages,
          { role: validacion.role, content: validacion.content },
        ];
      });
    }
    const { text } = await completion(prevMessages);

    //await sleep(1500);
    if (isJsonString(text) || intentos > 3) {
      let parsedResponse = JSON.parse(text);

      setChatHistory([
        ...chatHistory,
        {
          content: userMessage,
          message: userMessage,
          sender: "Usuario",
          role: "user",
        },
        {
          intentos: intentos,
          content: text,
          message: parsedResponse.message,
          sender: "CyberBot",
          role: "assistant",
        },
      ]);

      switch (parsedResponse.type) {
        case "listadoJuegos":
          let listaDeJuegos = parsedResponse.data.split(";");
          console.log(listaDeJuegos);
          break;
        case "juego":
          console.log("juego encontrado " + parsedResponse.data);
          break;
        case "genero":
          console.log("genero encontrado " + parsedResponse.data);
          break;
        case "chat":
          console.log("chat encontrado " + parsedResponse.data);
          break;
        default:
          console.log("tipo de respuesta invalido " + parsedResponse.data);
          break;
      }
    } else {
      console.info("No es JSON: " + text);
      if (Array.isArray(validaciones)) {
        getOpenaiResponse(userMessage, intentos + 1, [
          ...validaciones,
          { role: "assistant", content: text },
          {
            role: "user",
            content:
              "NO CUMPLE CON EL FORMATO INDICADO, NO PROPORCIONE NINGUN TEXTO POR FUERA DEL JSON REQUERIDO",
          },
        ]);
      } else {
        getOpenaiResponse(userMessage, intentos + 1, [
          { role: "assistant", content: text },
          {
            role: "user",
            content:
              "NO CUMPLE CON EL FORMATO INDICADO, NO PROPORCIONE NINGUN TEXTO POR FUERA DEL JSON REQUERIDO",
          },
        ]);
      }
    }
    setIsLoading(false);
  };

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return (
    <main className="bg-gray-900 min-h-screen w-auto flex">
      {userType.length == 0 && (
        <>
          <div className="bg-black opacity-60 text-white z-50 w-full h-screen fixed flex flex-col justify-evenly items-center"></div>
          <div className="w-full h-screen flex justify-center items-center absolute ">
            <div className=" bg-gray-900 w-1/2 h-auto p-5 rounded-md z-50 flex flex-col gap-3 items-center justify-evenly fixed shadow-md shadow-primary">

              {/* TOOLTIP */}
              <div className="group">
                <h1 className="text-white font-audiowide mt-3 text-4xl">
                  ¿ERES UN USUARIO{" "}
                  <span className="cursor-pointer border-b">GAMER</span>?
                  <span className=" transition-all absolute mr-2 top-20 right-0 scale-0 rounded bg-gray-800 p-4 border border-cyan-800 w-fit text-xs text-white group-hover:scale-100">
                    JUGADOR EXPERIMENTADO DE VIDEOJUEGOS
                  </span>
                </h1>
              </div>
              {/* FIN TOOLTIP */}

              <div className="w-80 h-w-80">
                <img
                  src="./GAMER.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between w-1/3 mb-4">
                <button
                  onClick={() => setUserType("GAMER")}
                  className="bg-gray-900 text-white font-audiowide border-4 border-emerald-700 px-6 py-2 hover:-translate-y-2 hover:shadow-md hover:shadow-green-600 transition-all"
                >
                  SI
                </button>
                <button
                  onClick={() => setUserType("NO GAMER")}
                  className="bg-gray-900 text-white font-audiowide border-4 border-red-700  px-6 py-2 hover:-translate-y-2 hover:shadow-md hover:shadow-red-600 transition-all"
                >
                  NO
                </button>
              </div>
              <p className="text-white font-audiowide">
                Esto definirá que tan detallada será la información que veas
              </p>
              <p className="text-white font-audiowide">
                Puedes volver a cambiarlo en cualquier momento.
              </p>
            </div>
          </div>
        </>
      )}
      <Nav show={showNav} setShow={setShowNav} />
      <div className="w-full ml-72 xs:ml-0 xs:p-4 py-7 bg-gray-900  z-30 fixed  xs:flex xs:justify-center xs:items-start xs:gap-3">
        <div
          className="cursor-pointer md:hidden mt-2"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="w-full ml-32 flex flex-col justify-center items-center xs:m-0">
          <input
            type="text"
            placeholder="PULSA AQUI PARA BUSCAR 🔍"
            className="font-audiowide bg-gray-800 text-white md:ml-32  md:w-1/2 xs:w-full p-3 rounded-lg border border-primary shadow-sm shadow-gray-400  "
            onChange={(e) => handleChange(e)}
            value={busqueda}
          />

          {gamesFilter.length > 0 &&
            gamesFilter.map((game) => (
              <Link
                href={`/games/${game.slug}`}
                key={game.slug}
                className=" md:w-1/2 md:ml-32 p-3 xs:m-0 xs:w-full bg-gray-700 text-white rounded-lg border border-cyan-800  shadow-md cursor-pointer hover:bg-gray-500 shadow-primary"
                onClick={() => {
                  setGamesFilter([]);
                  setBusqueda("");
                }}
              >
                <div className="flex gap-2 justify-start items-center">
                  <img
                    src={game.background_image}
                    className="w-10 h-10 object-cover rounded-lg"
                    alt=""
                  />
                  {game.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="text-white md:ml-72 xs:ml-0 xs:w-auto xs:m-0 w-full p-4 m-2 flex flex-col bg-gray-900">
        <div className="mt-24">
          
          {children}
        </div>
      </div>
      /* CHATBOT LAYOUT */
      <div className="fixed bottom-4 right-4 cursor-pointer flex items-end gap-3 z-30 ">
        <div
          className={
            (openChat ? "visible " : "hidden ") +
            "bg-gray-700 border-2 p-2 mt-3 max-h-screen  border-cyan-700 h-auto w-96 flex flex-col items-center justify-center"
          }
        >
          <h2 className="font-audiowide main-title text-center mt-2">
            CYBER CHAT
          </h2>
          <div
            className="bg-gray-900 p-3 overflow-y-scroll flex flex-col  "
            id="chat-history"
          >
            {chatHistory.map((message, i) => (
              <>
                <div
                  className="flex gap-3 m-2 justify-end bg-gray-600 rounded-lg p-2 items-center "
                  key={i}
                >
                  <img
                    src={
                      message.sender === "CyberBot"
                        ? "./bot.png"
                        : message.sender === "Usuario"
                        ? "./Malicki.png"
                        : "./loading.png"
                    }
                    className={
                      (message.sender === "Usuario"
                        ? " order-1 border border-red-500 "
                        : " order-0  border border-blue-500 ") +
                      " w-10 h-10 rounded-full"
                    }
                    alt=""
                  />
                  <p className="text-gray-300 font-oswald">{message.message}</p>
                </div>
              </>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 mt-3">
                <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
                <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
                <div className="w-2 h-2 rounded-full animate-pulse bg-primary"></div>
              </div>
            )}
          </div>
          <SendMessage
            sendMessage={sendMessage}
            setMessage={setMessage}
            message={message}
          />
        </div>
        <img
          src="./bot.png"
          alt="chatbot"
          className="bg-cyan-500 hover:shadow-lg hover:shadow-primary hover:-translate-y-3 transition-all rounded-full border-2 border-cyan-300 w-20 h-20  "
          onClick={() => setOpenChat(!openChat)}
        />
      </div>
    </main>
  );
}
