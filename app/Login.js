import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Firebase Auth 모듈과 GoogleAuthProvider 모듈 가져오기
import { useRouter } from 'next/navigation'; // Next.js 라우터를 사용
import { app } from './firebaseConfig'; // Firebase 앱 초기화 설정 가져오기

const Login = () => {
  const auth = getAuth(app); // Firebase Auth 인스턴스를 초기화
  const router = useRouter(); // Next.js 라우터 인스턴스 생성

  // Google 로그인을 처리하는 함수
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider 인스턴스를 생성
    try {
      const result = await signInWithPopup(auth, provider); // 팝업을 통해 Google 로그인을 시도
      const uid = result.user.uid; // 로그인한 사용자의 UID를 가져옴
      router.push(`/${uid}`); // UID를 포함한 채팅방 경로로 이동
    } catch (error) {
      console.error('Google login failed', error); // 로그인 실패 시 에러를 콘솔에 출력
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button> {/* Google 로그인 버튼 */}
    </div>
  );
};

export default Login;
