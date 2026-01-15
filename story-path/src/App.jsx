import { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import CharacterPage from './CharacterPage';
import QuizPage from './QuizPage';

function App() {
  // 1. Quản lý trạng thái chuyển trang
  const [currentPage, setCurrentPage] = useState('home');
  // 2. Lưu trữ dữ liệu nhân vật đang chọn để truyền sang Quiz
  const [activeCharacterData, setActiveCharacterData] = useState(null);

  // Hàm xử lý khi nhấn Quiz từ CharacterPage
  const handleGoToQuiz = (characterObj) => {
    setActiveCharacterData(characterObj); // Lưu object gồm id, name, bg, image
    setCurrentPage('quiz');
  };

  // Hàm xử lý quay lại từ Quiz hoặc CharacterPage
  const handleBackToCharacter = () => {
    setCurrentPage('character');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleEnterApp = () => {
    setCurrentPage('character');
  };

  // Lệnh return PHẢI nằm trong hàm App
  return (
    <>
      {/* Trang chủ */}
      {currentPage === 'home' && (
        <HomePage onEnter={handleEnterApp} />
      )}
      
      {/* Trang chọn nhân vật / chương */}
      {currentPage === 'character' && (
        <CharacterPage 
          onBack={handleBackToHome} 
          onGoToQuiz={handleGoToQuiz} 
        />
      )}
      
      {/* Trang Quiz */}
      {currentPage === 'quiz' && activeCharacterData && (
        <QuizPage 
          onBack={handleBackToCharacter} 
          characterData={activeCharacterData} 
        />
      )}
    </>
  );
}

export default App;