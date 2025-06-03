// src/components/AdminLayout.tsx

import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />  {/* 이 자리에 하위 라우트 컴포넌트가 렌더링됩니다 */}
    </>
  );
}
