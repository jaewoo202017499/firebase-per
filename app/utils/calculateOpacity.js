// 메시지의 투명도를 계산하는 함수
// timestamp: 메시지가 전송된 시간
// fadeDuration: 메시지가 점차 사라지는 데 걸리는 시간 (초 단위)
export const calculateOpacity = (timestamp, fadeDuration) => {
    const now = new Date(); // 현재 시간
    const messageTime = new Date(timestamp.seconds * 1000); // 메시지 전송 시간을 Date 객체로 변환
    const elapsed = (now - messageTime) / 1000; // 초 단위 경과 시간 계산
  
    // 경과 시간이 fadeDuration을 초과하면 투명도를 0으로 설정 (완전히 사라짐)
    if (elapsed >= fadeDuration) {
      return 0;
    }
  
    // 경과 시간에 비례하여 투명도를 계산하여 반환
    return 1 - (elapsed / fadeDuration);
  };
  