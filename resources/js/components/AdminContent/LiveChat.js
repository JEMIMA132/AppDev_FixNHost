import React, { useState, useRef, useEffect } from 'react';
import '../../../sass/AdminPages/LiveChat.scss';

const sampleConversations = [
  {
    id: 1,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Thank you for your help!',
    messages: [
      { id: 1, text: 'Hi, I need help with my booking.', sender: 'them', time: '09:00' },
      { id: 2, text: 'Sure! What seems to be the issue?', sender: 'me', time: '09:01' },
      { id: 3, text: 'I can\'t find my confirmation email.', sender: 'them', time: '09:02' },
      { id: 4, text: 'Let me check that for you.', sender: 'me', time: '09:03' },
      { id: 5, text: 'Thank you for your help!', sender: 'them', time: '09:04' },
    ],
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Can you send the invoice?',
    messages: [
      { id: 1, text: 'Hello, I need an invoice for my last service.', sender: 'them', time: '10:00' },
      { id: 2, text: 'Of course! I will send it shortly.', sender: 'me', time: '10:01' },
      { id: 3, text: 'Can you send the invoice?', sender: 'them', time: '10:02' },
    ],
  },
  {
    id: 3,
    name: 'Vendor Support',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    lastMessage: 'We have updated your profile.',
    messages: [
      { id: 1, text: 'Your profile has been updated successfully.', sender: 'them', time: '11:00' },
      { id: 2, text: 'Thank you!', sender: 'me', time: '11:01' },
      { id: 3, text: 'We have updated your profile.', sender: 'them', time: '11:02' },
    ],
  },
];

const LiveChat = () => {
  const [conversations, setConversations] = useState(sampleConversations);
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      id: selectedConversation.messages.length + 1,
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConversations(conversations =>
      conversations.map(conv =>
        conv.id === selectedId
          ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: input }
          : conv
      )
    );
    setInput('');
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="livechat">
      <aside className="livechat__sidebar">
        <div className="livechat__sidebar-header">Conversations</div>
        <div className="livechat__conversations">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`livechat__conversation${conv.id === selectedId ? ' active' : ''}`}
              onClick={() => setSelectedId(conv.id)}
            >
              <img src={conv.avatar} alt={conv.name} className="livechat__conversation-avatar" />
              <div className="livechat__conversation-info">
                <div className="livechat__conversation-name">{conv.name}</div>
                <div className="livechat__conversation-last">{conv.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="livechat__main">
        <div className="livechat__messages">
          {selectedConversation.messages.map(msg => (
            <div
              key={msg.id}
              className={`livechat__message-row${msg.sender === 'me' ? ' own' : ''}`}
            >
              <img
                src={msg.sender === 'me' ? 'https://randomuser.me/api/portraits/men/1.jpg' : selectedConversation.avatar}
                alt="avatar"
                className="livechat__message-avatar"
              />
              <div className={`livechat__message-bubble${msg.sender === 'me' ? ' own' : ''}`}>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="livechat__input-area" onSubmit={handleSend} autoComplete="off">
          <input
            className="livechat__input"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="livechat__send-btn" type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default LiveChat;
