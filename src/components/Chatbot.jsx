import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState(""); // Track what's being typed
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);

  // Function to handle sending
  const handleSend = (e) => {
    // Only send if the "Enter" key is pressed and text isn't empty
    if (e.key === 'Enter' && inputText.trim() !== "") {
      const userMsg = inputText.toLowerCase(); // used in converting to lowercase for easy matching
      const newMessage = { text: inputText, sender: "user" };
      
      // Update message history
      setMessages([...messages, newMessage]);
      
      // Clear input field
      setInputText("");

      // setting the bot logic
      let botResponse = "I'm not sure I understand. would you like to see our trending movies?"
      
      if (userMsg.includes("price") || userMsg.includes("cost")) {
        botResponse = "our movies offer variable prices, which one would you like. Or would you like us to prepare a monthly subscription for you"
      } else if (userMsg.includes("horror") || userMsg.includes("scary")) {
        botResponse = "If you like horror then you should check out the originals 🧛🧛🧛, find it from the search bar"
      } else if (userMsg.includes("pay") || userMsg.includes("mpesa")) {
        botResponse = "we support mpesa go to make payment an finish your order"
      }

      // delaying payment to create realism and human feel
      setTimeout(() => {
        setMessages(prev => [...prev, { text: botResponse, sender: "bot"}]);
      }, 800);


   }
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`border shadow-lg rounded-3 bg-white`} 
           style={{ display: isOpen ? 'flex' : 'none', position: 'fixed', bottom: '90px', right: '20px', width: '320px', height: '450px', flexDirection: 'column', zIndex: 1000 }}>
        
        <div className="bg-dark text-white p-3 rounded-top d-flex justify-content-between">
          <span className="fw-bold">Movie Support</span>
          <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
        </div>

        {/* Message History Display */}
        <div className="p-3 flex-grow-1 overflow-auto bg-light">
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
              <div className={`p-2 rounded shadow-sm ${msg.sender === 'user' ? 'bg-danger text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '80%' }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-2 border-top bg-white">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Type and press Enter..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSend} // Triggered on key press
          />
        </div>
      </div>

      {/* Floating Toggle Button */}
      <div onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, cursor: 'pointer' }}>
        <div className="btn btn-danger rounded-circle shadow-lg d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          <span style={{ fontSize: '24px' }}>💬</span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;