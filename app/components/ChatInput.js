import React from 'react';

// ChatInput 컴포넌트: 메시지 입력 필드와 전송 버튼을 포함합니다.
// newMessage: 입력된 새로운 메시지 상태
// setNewMessage: 새로운 메시지 상태를 업데이트하는 함수
// handleSendMessage: 메시지 전송을 처리하는 함수
// handleKeyPress: 키보드 입력을 처리하는 함수 (Enter 키로 메시지 전송)
// inputRef: 입력 필드에 대한 ref 객체
const ChatInput = ({ newMessage, setNewMessage, handleSendMessage, handleKeyPress, inputRef }) => {
  return (
    <div className="chat-input">
      {/* 메시지 입력 필드 */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} // 입력된 메시지를 상태로 업데이트
        onKeyPress={handleKeyPress} // 키보드 입력을 처리 (Enter 키로 메시지 전송)
        placeholder="Type a message"
        style={{ color: 'black' }}
        ref={inputRef} // 입력 필드에 대한 ref 설정
      />
      {/* 메시지 전송 버튼 */}
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
