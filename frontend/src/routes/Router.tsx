import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import CompetitionPage from '../pages/CompetitionPage';
import RecordPage from '../pages/RecordPage';
import GearPage from '../pages/GearPage';
import GuidePage from '../pages/GuidePage';
import CommunityPage from '../pages/CommunityPage';
import MyPage from '../pages/MyPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Layout from '../components/Layout';

// 인증 관련 페이지는 Layout 외부에서 렌더링
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/competition" element={<CompetitionPage />} />
                <Route path="/record" element={<RecordPage />} />
                <Route path="/gear" element={<GearPage />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 