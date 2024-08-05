import React from 'react';
import ChatMessage from './ChatMessage'; // 개별 메시지를 렌더링하는 컴포넌트

// ChatMessages 컴포넌트: 메시지 목록을 렌더링합니다.
// messages: 메시지 배열
// calculateOpacity: 메시지의 투명도를 계산하는 함수
// fadeDuration: 메시지가 점차 사라지는 데 걸리는 시간
// messagesEndRef: 메시지 목록의 끝 부분을 참조하는 ref 객체
const ChatMessages = ({ messages, calculateOpacity, fadeDuration, messagesEndRef }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        // 개별 메시지를 렌더링하는 ChatMessage 컴포넌트
        <ChatMessage key={index} message={message} calculateOpacity={calculateOpacity} fadeDuration={fadeDuration} />
      ))}
      {/* 메시지 목록의 끝 부분을 참조하는 div */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
