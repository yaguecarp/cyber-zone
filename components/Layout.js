import { useState } from "react";
import Nav from "./Nav";
import SendMessage from "./SendMessage";
import {SystemGPT} from "./SystemPromptGPT";

import { OpenAIClient } from 'openai-fetch';

export default function Layout({ children }) {

  
  const [openChat, setOpenChat] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      message: 
      `Hola! Mi nombre es CyberBot y puedo ayudarte con dudas puntuales
      que tengas de tus juegos favoritos!
      Decime, en que puedo ayudar?`,
      sender: "CyberBot"
    }
  ]);
  
  const [message, setMessage] = useState("");
  const client = new OpenAIClient({ apiKey: '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' });

  async function completion(messages) {
    const completion = await client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.6,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    
    
    console.log(completion);
    debugger;

    if (!completion.response.usage) {
      return {
        text: completion.response.choices[0].message?.content || '',
        tokens: 0,
      }
    }

    return {
      text: completion.response.choices[0].message?.content || '',
      tokens: completion.response.usage.total_tokens,
    }
  }

  const sendMessage = () =>{
    setChatHistory(
      [...chatHistory, {
        message:message,
        sender:"Usuario"
      }]);
      getOpenaiResponse(message);
      setMessage("");
  }
  const getOpenaiResponse = async(userMessage) =>
  //: Promise<string | any> 
  {

    //console.info('promptUser getResponseAnswerResolver: ', promptUser);
     const { text } = await completion(
      [
        {
          role: 'system', content: SystemGPT
        },
        {
          role: 'user', content: userMessage
        },
      ]
    ); 

    console.info('response: ');
    //await sleep(1500);
    setChatHistory(
      [...chatHistory,
        
        {
        message:userMessage,
        sender:"Usuario"
      },
        {
        message:text,
        sender:"CyberBot"
      }]
    )
  }

  return (
    <main className="bg-gray-900 min-h-screen flex">
      <Nav />
      <div className="w-full ml-72 py-7 fixed bg-gray-900 z-10">
        <input
          type="text"
          placeholder="PULSA AQUI PARA BUSCAR 🔍"
          className="font-audiowide bg-gray-800  w-1/2 p-3 rounded-lg border border-primary shadow-sm shadow-gray-400  "
        />
      </div>
      <div className="text-white ml-72  w-full p-4 m-2 flex flex-col">
        <div className="mt-24">{children}</div>
      </div>

      <div className="fixed bottom-4 right-4 cursor-pointer flex items-end gap-3">
        <div className={(openChat ? 'visible ' : 'hidden ') + "bg-gray-700 border-2 p-2 mt-3 border-cyan-700 h-auto w-96 flex flex-col items-center justify-center"}>
          <h2 className="font-audiowide main-title text-center mt-2">
            CYBER CHAT
          </h2>
          <div className="bg-gray-900" id="chat-history">
            {chatHistory.map((message,i) => (
              <div key={i}
              className={message!=null?"":"d-none"}>
                <img 
                src = {message.sender == "CyberBot"?"./bot.png":(message.sender == "Usuario"?"./Malicki.png":"./loading.png")}
                
                 className="w-10 h-10" alt="" />
                <p className="text-gray-400 font-oswald">
                  {message.message}
                </p>
              </div>
            ))}

          </div>
          <SendMessage sendMessage={sendMessage} setMessage={setMessage} message={message}/>
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
