// src/services/api.ts
import axios from 'axios'

// ——————————————————————————————————————————————————————————————————————
// (나중에 백엔드 연동할 때 아래 두 인스턴스를 그대로 사용하세요)
// ——————————————————————————————————————————————————————————————————————
export const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. http://localhost:3000/api
  withCredentials: true,
})

export const aiAPI = axios.create({
  baseURL: import.meta.env.VITE_FASTAPI_URL, // e.g. http://localhost:8000/api
  withCredentials: false,
})

// ——————————————————————————————————————————————————————————————————————
// 사용자 관리, AI 생성, 요약/문제 API는 백엔드 준비 후에 다시 추가하세요.
// ——————————————————————————————————————————————————————————————————————

export default {}
