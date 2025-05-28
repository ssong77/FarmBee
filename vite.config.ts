import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // dev 모드일 땐 기본 경로, prod 모드일 땐 깃허브 Pages 리포지토리명
  return {
    base: mode === 'development' ? '/' : '/FarmBee/', // 저장소 이름에 맞게 수정
    plugins: [react()],
  }
})