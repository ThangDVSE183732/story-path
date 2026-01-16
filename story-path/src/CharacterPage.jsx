import { useState, useRef } from 'react';
import './CharacterPage.css';

import FrameSVG from './components/FrameSVG';
import FrameClipPath from './components/FrameClipPath';
import VisitorCounter from './components/VisitorCounter';
import { sendMessageToClaude } from './services/claudeService';

// Import 6 ảnh
import img1 from './pictures/1.jpg';
import img2 from './pictures/2.jpg';
import img3 from './pictures/3.jpg';
import img4 from './pictures/4.jpg';
import img5 from './pictures/5.jpg';
import img6 from './pictures/6.jpg';

function CharacterPage({ onBack, onGoToContent, onGoToQuiz }) {
  const stages = {
    Stage1: { id: 'merlin', name: 'Merlin', title: 'The Prophet', bg: 'bg-forest', image: img1, desc: 'King, Prophet, Bard. Merlin is the Soul of Britain, and he is Immortal.' },
    Stage2: { id: 'avallach', name: 'Avallach', title: 'The Wise Elder', bg: 'bg-mountain', image: img2, desc: 'Ancient guardian of the old ways, keeper of forgotten knowledge.' },
    Stage3: { id: 'morgian', name: 'Morgian', title: 'The Mystic', bg: 'bg-castle', image: img3, desc: 'A fierce protector of the realm, wielding both blade and magic.' },
    Stage4: { id: 'pelleas', name: 'Pelleas', title: 'The Shadow', bg: 'bg-cave', image: img4, desc: 'A mysterious figure bound by ancient oaths and dark secrets.' },
    Stage5: { id: 'galahad', name: 'Galahad', title: 'The Knight', bg: 'bg-lake', image: img5, desc: 'The pure of heart, destined to find the sacred grail.' },
    Stage6: { id: 'nimue', name: 'Nimue', title: 'The Lady', bg: 'bg-ocean', image: img6, desc: 'Keeper of Excalibur, guiding the fate of kings.' },
  };

  const stageKeys = Object.keys(stages);
  const [currentKey, setCurrentKey] = useState('Stage1');
  const [isExiting, setIsExiting] = useState(false);
  
  // AI Chatbot states
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Draggable AI icon states
  const [aiIconPosition, setAiIconPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const handleStageChange = (key) => {
    if (key === currentKey) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrentKey(key);
      setIsExiting(false);
    }, 400);
  };
  
  // Draggable AI icon handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: aiIconPosition.x,
      initialY: aiIconPosition.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    setAiIconPosition({
      x: dragRef.current.initialX + deltaX,
      y: dragRef.current.initialY + deltaY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAiIconClick = (e) => {
    if (!isDragging) {
      setShowChatbot(!showChatbot);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() && !isLoading) {
      const userMessage = chatInput;
      setChatMessages([...chatMessages, { type: 'user', text: userMessage }]);
      setChatInput('');
      setIsLoading(true);
      
      try {
        const aiResponse = await sendMessageToClaude(userMessage, current);
        setChatMessages(prev => [...prev, { 
          type: 'ai', 
          text: aiResponse
        }]);
      } catch (error) {
        setChatMessages(prev => [...prev, { 
          type: 'ai', 
          text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const current = stages[currentKey];

  return (
    <div 
      className={`character-page ${current.bg}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <FrameClipPath />
      <VisitorCounter />
      
      <div className="full-screen-container">
        <header className="header">
          <div className="header-left">
            <div className="menu-text" onClick={onBack}>Trở về</div>
            <div className="header-line"></div>
          </div>
          <div className="header-right">
            <div className="header-line"></div>
            <button className="more-button">⋯</button>
          </div>
        </header>

        <main className={`main-layout ${isExiting ? 'fade-out' : 'fade-in'}`}>
          <div className="info-box">
            <h1 className="character-name">{current.name}</h1>
            <h2 className="character-title">{current.title}</h2>
            <p className="character-description">{current.desc}</p>
            
            <div className="action-buttons">
              <button className="btn-action primary" onClick={() => onGoToContent(current)}>
                Nội dung chi tiết
              </button>
             <button 
                  className="btn-action secondary" 
                  onClick={() => onGoToQuiz(current)} 
                >
                  Quiz
                </button>
            </div>
          </div>

          <div className="main-portrait">
            <div className="portrait-frame">
              <img src={current.image} alt={current.name} className="portrait-img" />
              <FrameSVG className="svg-border" size="large" />
            </div>
          </div>
        </main>

        <footer className="journey-footer">
          <div className="journey-row">
            {stageKeys.map((key) => (
              <div 
                key={key} 
                className={`journey-item ${currentKey === key ? 'active' : 'inactive'}`}
                onClick={() => handleStageChange(key)}
              >
                <div className="thumb-container">
                  <img src={stages[key].image} alt={key} className="thumb-img" />
                  <FrameSVG className="thumb-svg" size="small" />
                </div>
                <span className="thumb-name">{stages[key].name}</span>
              </div>
            ))}
          </div>
          <div className="decorative-line"></div>
        </footer>
      </div>
      
      {/* Draggable AI Icon */}
      <div
        className={`ai-chat-icon ${isDragging ? 'dragging' : ''}`}
        style={{
          left: `${aiIconPosition.x}px`,
          top: `${aiIconPosition.y}px`
        }}
        onMouseDown={handleMouseDown}
        onClick={handleAiIconClick}
      >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="url(#aiGradient)" />
          <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="10" r="1.5" fill="white"/>
          <circle cx="15" cy="10" r="1.5" fill="white"/>
          <path d="M9 14c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <defs>
            <linearGradient id="aiGradient" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#c4b998" />
              <stop offset="100%" stopColor="#8b7355" />
            </linearGradient>
          </defs>
        </svg>
        <div className="ai-icon-pulse"></div>
      </div>

      {/* Chatbot Dialog */}
      {showChatbot && (
        <div className="chatbot-dialog">
          <div className="chatbot-header">
            <h3>Tư tưởng Hồ Chí Minh</h3>
            <button className="chatbot-close" onClick={() => setShowChatbot(false)}>✕</button>
          </div>
          <div className="chatbot-messages">
            {chatMessages.length === 0 && (
              <div className="chatbot-welcome">
                Xin chào! Tôi là trợ lý AI về Tư tưởng Hồ Chí Minh. Hãy hỏi tôi về các giá trị, triết lý, lịch sử cách mạng và di sản Bác Hồ!
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai loading">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage} 
              className="chatbot-send"
              disabled={isLoading || !chatInput.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterPage;