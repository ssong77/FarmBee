// AppRouter.tsx

import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignupPage from '../pages/SignupPage'
import AnalysisPage from '../pages/AnalysisPage'
import ReservationPage from '../pages/ReservationPage'
import StatisticsPage from '../pages/StatisticsPage' 
import AdminDashboard from '../pages/AdminDashboard' 

export default function AppRouter() {
  return (
    <Routes>
      {/* 공개 경로 */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/analysis"
        element={
            <AnalysisPage />
        }
      />
      <Route path="/reservation" element={<ReservationPage />} />
       <Route path="/statistics" element={<StatisticsPage />} />
      {/* 보호된 경로 */}
      {/* 관리자 전용 경로 */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
