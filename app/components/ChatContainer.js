import React from 'react';
import { handleLogout } from '../utils/handleLogout'; // 로그아웃 기능을 처리하는 유틸리티 함수

// ChatContainer 컴포넌트: 채팅 페이지의 기본 레이아웃을 담당합니다.
// user: 현재 로그인한 사용자 정보
// router: Next.js 라우터 객체
// children: 하위 컴포넌트들을 렌더링하기 위한 슬롯
const ChatContainer = ({ user, router, children }) => {
  return (
    <div className="chat-container">
      {/* 페이지 타이틀 */}
      <h1 className="text-2xl font-bold p-4">Chat Room</h1>
      
      {/* 사용자 정보 및 로그아웃 버튼 */}
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <span>Welcome, {user?.email}</span>
        <button onClick={() => handleLogout(router)} className="bg-red-500 text-white p-2 rounded-md">Logout</button>
      </div>
      
      {/* 하위 컴포넌트들 */}
      {children}
    </div>
  );
};

export default ChatContainer;
