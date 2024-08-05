import { handleSendMessage } from './handleSendMessage'; // 메시지 전송을 처리하는 유틸리티 함수

// 키보드 입력을 처리하는 함수
// e: 키보드 이벤트 객체
// newMessage: 입력된 새로운 메시지 상태
// setNewMessage: 새로운 메시지 상태를 업데이트하는 함수
// user: 현재 로그인한 사용자 정보
// uid: 채팅방 ID
// scrollToBottom: 스크롤을 맨 아래로 이동시키는 함수
// inputRef: 입력 필드에 대한 ref 객체
export const handleKeyPress = (e, newMessage, setNewMessage, user, uid, scrollToBottom, inputRef) => {
  if (e.key === 'Enter') { // Enter 키가 눌렸을 때
    handleSendMessage(newMessage, setNewMessage, user, uid, scrollToBottom, inputRef); // 메시지 전송 함수 호출
  }
};
