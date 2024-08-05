'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/useAuth'; // 사용자 인증 상태를 확인하는 유틸리티 함수
import { useFetchMessages } from '../utils/useFetchMessages'; // Firestore에서 메시지를 불러오는 유틸리티 함수
import { useRemoveExpiredMessages } from '../utils/useRemoveExpiredMessages'; // 일정 시간이 지난 메시지를 제거하는 유틸리티 함수
import { handleSendMessage } from '../utils/handleSendMessage'; // 새로운 메시지를 Firestore에 저장하는 유틸리티 함수
import { handleKeyPress } from '../utils/handleKeyPress'; // Enter 키 입력을 처리하는 유틸리티 함수
import { scrollToBottom } from '../utils/scrollToBottom'; // 스크롤을 맨 아래로 이동시키는 유틸리티 함수
import { calculateOpacity } from '../utils/calculateOpacity'; // 메시지의 투명도를 계산하는 유틸리티 함수
import ChatContainer from '../components/ChatContainer'; // 채팅 페이지의 기본 레이아웃 컴포넌트
import ChatInput from '../components/ChatInput'; // 메시지 입력 필드와 전송 버튼 컴포넌트
import ChatMessages from '../components/ChatMessages'; // 메시지 목록을 렌더링하는 컴포넌트

const FADE_DURATION_SECONDS = 180; // 3분 = 180초

const ChatRoom = ({ params }) => {
  const router = useRouter();
  const { uid } = params; // URL 파라미터에서 uid를 가져옴
  const [messages, setMessages] = useState([]); // 메시지 상태 관리
  const [newMessage, setNewMessage] = useState(''); // 새로운 메시지 입력 상태 관리
  const messagesEndRef = useRef(null); // 메시지 목록 끝 부분을 참조하는 ref
  const inputRef = useRef(null); // 입력 필드에 대한 ref
  const user = useAuth(); // 사용자 인증 상태를 확인

  // Firestore에서 메시지를 불러오고 상태를 업데이트
  useFetchMessages(uid, setMessages, FADE_DURATION_SECONDS, () => scrollToBottom(messagesEndRef));

  // 일정 시간이 지난 메시지를 상태에서 제거
  useRemoveExpiredMessages(setMessages, FADE_DURATION_SECONDS);

  return (
    // 채팅 페이지의 기본 레이아웃 컴포넌트
    <ChatContainer user={user} router={router}>
      {/* 메시지 목록을 렌더링하는 컴포넌트 */}
      <ChatMessages
        messages={messages}
        calculateOpacity={calculateOpacity}
        fadeDuration={FADE_DURATION_SECONDS}
        messagesEndRef={messagesEndRef}
      />
      {/* 메시지 입력 필드와 전송 버튼 컴포넌트 */}
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={() => handleSendMessage(newMessage, setNewMessage, user, uid, () => scrollToBottom(messagesEndRef), inputRef)}
        handleKeyPress={(e) => handleKeyPress(e, newMessage, setNewMessage, user, uid, () => scrollToBottom(messagesEndRef), inputRef)}
        inputRef={inputRef}
      />
    </ChatContainer>
  );
};

export default ChatRoom;
