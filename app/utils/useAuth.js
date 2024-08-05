import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication 상태 변경 리스너
import { useRouter } from 'next/navigation'; // Next.js 라우터
import { auth } from '../firebaseConfig'; // Firebase Authentication 인스턴스

// 사용자 인증 상태를 확인하는 커스텀 훅
export const useAuth = () => {
  const [user, setUser] = useState(null); // 사용자 상태 관리
  const router = useRouter(); // Next.js 라우터 인스턴스

  useEffect(() => {
    // Firebase Authentication 상태 변경을 감지하는 리스너 등록
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 인증되었을 때 사용자 상태를 업데이트
        setUser(user);
      } else {
        // 사용자가 인증되지 않았을 때 로그인 페이지로 리다이렉트
        router.push('/');
      }
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, [router]);

  // 현재 사용자 반환
  return user;
};
