// src/AppRouter.tsx

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignupPage from '../pages/SignupPage';
import AnalysisPage from '../pages/AnalysisPage';
import ReservationPage from '../pages/ReservationPage';
import StatisticsPage from '../pages/StatisticsPage';

import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagementPage from '../pages/UserManagementPage';
import AdminReservationsPage from '../pages/AdminReservationsPage';
import AdminAnalysisReportPage from '../pages/AdminAnalysisReportPage';
import AdminStatisticsPage from '../pages/AdminStatisticsPage';

import AdminSystemSettingsPage from '../pages/AdminSystemSettingsPage';
export default function AppRouter() {
  return (
    <Routes>
      {/* 공개 경로 */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />

      {/* ── 관리자 전용 레이아웃 (/admin/*) ── */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* /admin (대시보드) */}
        <Route index element={<AdminDashboard />} />
        {/* /admin/users */}
        <Route path="users" element={<UserManagementPage />} />
        {/* /admin/reservations */}
        <Route path="reservations" element={<AdminReservationsPage />} />
        <Route path="analysis-reports" element={<AdminAnalysisReportPage />} />
        <Route path="statistics" element={<AdminStatisticsPage />} />
        <Route path="statistics" element={<AdminStatisticsPage />} />
+       <Route path="settings" element={<AdminSystemSettingsPage />} />
      </Route>
    </Routes>
  );
}
