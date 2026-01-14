import { useState, useEffect } from 'react'
import MorgianProfile from './pages/MorgianProfile' // Import trang bạn vừa tạo
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Logic để quản lý Dark Mode đồng bộ với Tailwind CSS
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      {/* Gọi Component MorgianProfile vào giao diện chính */}
      <MorgianProfile />

      {/* Nút chuyển đổi Dark Mode (nếu component MorgianProfile chưa có sẵn nút này) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="bg-primary/20 hover:bg-primary/40 text-primary p-3 rounded-full backdrop-blur-sm border border-primary/30 transition-all shadow-lg"
        >
          <span className="material-icons">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </>
  )
}

export default App