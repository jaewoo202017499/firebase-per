import { useEffect } from 'react';

// 일정 시간이 지난 메시지를 상태에서 제거하는 커스텀 훅
// setMessages: 메시지 상태를 업데이트하는 함수
// fadeDuration: 메시지가 점차 사라지는 데 걸리는 시간 (초 단위)
export const useRemoveExpiredMessages = (setMessages, fadeDuration) => {
  useEffect(() => {
    // 1초마다 실행되는 인터벌 설정
    const interval = setInterval(() => {
      const now = new Date(); // 현재 시간
      // 이전 메시지 상태를 필터링하여 일정 시간이 지난 메시지를 제거
      setMessages(prevMessages => prevMessages.filter(message => {
        const messageTime = new Date(message.timestamp.seconds * 1000); // 메시지 전송 시간을 Date 객체로 변환
        const elapsed = (now - messageTime) / 1000; // 초 단위 경과 시간 계산
        return elapsed < fadeDuration; // 지정된 시간 이내의 메시지만 유지
      }));
    }, 1000); // 매 초마다 실행

    // 컴포넌트 언마운트 시 인터벌 해제
    return () => clearInterval(interval);
  }, [setMessages, fadeDuration]);
};
