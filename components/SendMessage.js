import { useState } from "react";
export default function SendMessage ({sendMessage,setMessage,message}) {

  const onFormSubmit = e => {
    e.preventDefault();
    sendMessage();
  }


  return (
    <form   onSubmit={onFormSubmit}
            className="send-message bg-gray-900 border text-white border-gray- w-full py-2 px-2">
      <input
        placeholder="Escribe tu pregunta..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" onClick={sendMessage}>Send</button>
    </form>
  );
};
