import { useState } from 'react';
import './CharacterPage.css';

import FrameSVG from './components/FrameSVG';
import FrameClipPath from './components/FrameClipPath';

import img5 from './pictures/5.jpg';

function CharacterPage({
  onBack,
  onGoToContent,
  onGoToQuiz,
  initialStage = 'Stage1',
  onStageChange
}) {
  // Đã sửa: Chuyển thành chữ 'stages' thường để đồng bộ với code bên dưới
  const stages = {
    Stage1: {
      id: 'merlin',
      name: 'Sự Ra Đời Của Đảng',
      title: 'Sự tất yếu & Vai trò lãnh đạo',
      bg: 'bg-forest',
      image: 'https://i.pinimg.com/736x/89/ca/4b/89ca4bb279d861de352644d5cbf1074a.jpg',
      desc: 'Khẳng định Đảng là nhân tố quyết định thắng lợi, ra đời từ sự kết hợp giữa chủ nghĩa Mác - Lênin với phong trào công nhân và yêu nước.'
    },

    Stage2: {
      id: 'arthur',
      name: 'Đảng Văn Minh',
      title: 'Bản chất & Nguyên tắc hoạt động',
      bg: 'bg-mountain',
      image: 'https://i.pinimg.com/736x/ef/66/2f/ef662f401a39b312846792caea80aad9.jpg',
      desc: 'Khám phá tư tưởng "Đảng là đạo đức, là văn minh" cùng 8 nguyên tắc xây dựng Đảng kiểu mới để giữ vững bản chất cách mạng.'
    },

    Stage3: {
      id: 'lancelot',
      name: 'Cái Gốc Công Việc',
      title: 'Xây dựng đội ngũ Cán bộ',
      bg: 'bg-castle',
      image: 'https://media.baobinhphuoc.com.vn/Content/UploadFiles/EditorFiles/images/2017/Quy4/ccc26102017105816.jpg',
      desc: 'Tập trung vào tư tưởng "Cán bộ là cái gốc của mọi công việc", tiêu chuẩn Đức - Tài và rèn luyện tư cách người cách mạng.'
    },

    Stage4: {
      id: 'galahad',
      name: 'Chủ Quyền Nhân Dân',
      title: 'Nhà nước của, do, vì Dân',
      bg: 'bg-cave',
      image: 'https://cdn.cungcap.net/media/img/2019/04/15/ncG7c-1555272912.jpeg',
      desc: 'Làm rõ bản chất nhà nước dân chủ, nơi tất cả quyền lực thuộc về nhân dân và cán bộ đóng vai trò là "công bộc" trung thành.'
    },

    Stage5: {
      id: 'percival',
      name: 'Pháp Quyền Nhân Nghĩa',
      title: 'Pháp luật & Kiểm soát quyền lực',
      bg: 'bg-lake',
      image: img5,
      desc: 'Xây dựng nhà nước thượng tôn pháp luật gắn liền với đạo đức và các biện pháp quyết liệt phòng chống "giặc nội xâm".'
    },

    Stage6: {
      id: 'tristan',
      name: 'Đổi Mới Hiện Nay',
      title: 'Vận dụng trong giai đoạn mới',
      bg: 'bg-ocean',
      image: 'https://i.vnask.com/Data/image/2021/04/10/tho-bac-ho-thieu-nhi-1.jpg',
      desc: 'Kiên định mục tiêu độc lập dân tộc và CNXH, đồng thời đổi mới phương thức lãnh đạo của Đảng trong bối cảnh thời đại mới.'
    }
  };

  const stageKeys = Object.keys(stages);
  const [currentKey, setCurrentKey] = useState(initialStage);
  const [isExiting, setIsExiting] = useState(false);

  const handleStageChange = (key) => {
    if (key === currentKey) return;

    setIsExiting(true);

    setTimeout(() => {
      setCurrentKey(key);
      setIsExiting(false);
      onStageChange?.(key);
    }, 400); 
  };

  const current = stages[currentKey];

  return (
    <div className={`character-page ${current.bg}`}>
      <FrameClipPath />

      <div className="full-screen-container">
        <header className="header">
          <div className="header-left">
            <div className="menu-text" onClick={onBack} style={{cursor: 'pointer'}}>Trở về</div>
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
              <button
                className="btn-action primary"
                onClick={() => onGoToContent(current)}
              >
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
              <img
                src={current.image}
                alt={current.name}
                className="portrait-img"
              />
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
                  <img
                    src={stages[key].image}
                    alt={stages[key].name}
                    className="thumb-img"
                  />
                  <FrameSVG className="thumb-svg" size="small" />
                </div>
                <span className="thumb-name">{stages[key].name}</span>
              </div>
            ))}
          </div>
          <div className="decorative-line"></div>
        </footer>
      </div>
    </div>
  );
}

export default CharacterPage;