import { collection, addDoc, query, orderBy, getDocs, updateDoc, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firebase Firestore 데이터베이스 인스턴스를 가져옴

// 메시지 전송을 처리하는 함수
// newMessage: 입력된 새로운 메시지 상태
// setNewMessage: 새로운 메시지 상태를 업데이트하는 함수
// user: 현재 로그인한 사용자 정보
// uid: 채팅방 ID
// scrollToBottom: 스크롤을 맨 아래로 이동시키는 함수
// inputRef: 입력 필드에 대한 ref 객체
export const handleSendMessage = async (newMessage, setNewMessage, user, uid, scrollToBottom, inputRef) => {
  if (newMessage.trim()) { // 새로운 메시지가 비어있지 않을 때
    const docRef = collection(db, 'chats', uid, 'messageBatches'); // 메시지 배치 컬렉션 참조
    const latestBatchQuery = query(docRef, orderBy('timestamp', 'desc'), limit(1)); // 최신 메시지 배치를 가져오는 쿼리
    const latestBatchSnapshot = await getDocs(latestBatchQuery); // 쿼리 실행

    let latestBatchDoc;
    if (!latestBatchSnapshot.empty) {
      latestBatchDoc = latestBatchSnapshot.docs[0]; // 최신 메시지 배치를 가져옴
    }

    let messages = [];
    if (latestBatchDoc && latestBatchDoc.data().messages.length < 50) {
      // 현재 배치에 메시지를 추가할 수 있는 경우
      messages = [...latestBatchDoc.data().messages, {
        text: newMessage,
        uid: user.uid,
        timestamp: new Date(),
      }];
      await updateDoc(latestBatchDoc.ref, { messages }); // 기존 배치를 업데이트
      console.log('Updated batch:', latestBatchDoc.id, messages);
    } else {
      // 새로운 메시지 배치를 생성해야 하는 경우
      messages = [{
        text: newMessage,
        uid: user.uid,
        timestamp: new Date(),
      }];
      const newDoc = await addDoc(docRef, {
        messages,
        timestamp: new Date(),
      });
      console.log('Created new batch:', newDoc.id, messages);
    }

    setNewMessage(''); // 입력 필드 초기화
    inputRef.current?.focus(); // 입력 필드에 포커스 유지
    scrollToBottom(); // 스크롤을 최신 메시지로 이동
  }
};
