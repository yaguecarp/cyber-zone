import { useState } from "react";
export default function SendMessage({ sendMessage, setMessage, message }) {
  const onFormSubmit = (e) => {
    e.preventDefault();
    // sendMessage();
    setMessage('')
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="send-message bg-gray-900 border text-white border-gray-600 w-full py-2 px-2 flex justify-between"
    >
      <input
        placeholder="Escribe tu pregunta..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-gray-700 w-full mr-2 rounded-lg py-1 px-2"
      />
      <button type="submit" onClick={sendMessage} className="bg-primary py-1 px-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
}
