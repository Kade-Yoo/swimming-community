import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyPage from '../pages/MyPage';
import CommunityPage from '../pages/CommunityPage';
import CompetitionPage from '../pages/CompetitionPage';
import GearPage from '../pages/GearPage';
import GuidePage from '../pages/GuidePage';
import RecordPage from '../pages/RecordPage';

const Router: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
        <Route path="/gear" element={<GearPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router; 