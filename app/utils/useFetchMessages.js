import { useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firebase Firestore 데이터베이스 인스턴스를 가져옴

// Firestore에서 메시지를 불러오는 커스텀 훅
// uid: 채팅방 ID
// setMessages: 메시지 상태를 업데이트하는 함수
// fadeDuration: 메시지가 점차 사라지는 데 걸리는 시간 (초 단위)
// scrollToBottom: 스크롤을 맨 아래로 이동시키는 함수
export const useFetchMessages = (uid, setMessages, fadeDuration, scrollToBottom) => {
  useEffect(() => {
    // Firestore에서 채팅방의 메시지 배치 컬렉션을 쿼리
    const q = query(
      collection(db, 'chats', uid, 'messageBatches'),
      orderBy('timestamp')
    );

    // Firestore 쿼리에 대한 실시간 리스너를 설정
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date(); // 현재 시간
      let allMessages = [];
      snapshot.docs.forEach(doc => {
        // 각 메시지 배치 문서의 메시지를 필터링
        const batchMessages = doc.data().messages.filter(message => {
          const messageTime = new Date(message.timestamp.seconds * 1000); // 메시지 전송 시간을 Date 객체로 변환
          const elapsed = (now - messageTime) / 1000; // 초 단위 경과 시간 계산
          return elapsed < fadeDuration; // 지정된 시간 이내의 메시지만 필터링
        });
        allMessages = [...allMessages, ...batchMessages]; // 필터링된 메시지를 합침
      });
      setMessages(allMessages); // 메시지 상태 업데이트
      scrollToBottom(); // 스크롤을 최신 메시지로 이동
    });

    // 컴포넌트 언마운트 시 Firestore 리스너 해제
    return () => unsubscribe();
  }, [uid, setMessages, fadeDuration, scrollToBottom]);
};
