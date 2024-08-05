import React from 'react';

// ChatMessage 컴포넌트: 개별 메시지를 렌더링합니다.
// message: 개별 메시지 객체
// calculateOpacity: 메시지의 투명도를 계산하는 함수
// fadeDuration: 메시지가 점차 사라지는 데 걸리는 시간
const ChatMessage = ({ message, calculateOpacity, fadeDuration }) => {
  return (
    <div className="chat-message" style={{ opacity: calculateOpacity(message.timestamp, fadeDuration) }}>
      <strong>{message.uid}</strong>: {message.text}
    </div>
  );
};

export default ChatMessage;
