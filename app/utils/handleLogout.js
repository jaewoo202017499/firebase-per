import { getAuth } from 'firebase/auth'; // Firebase Authentication 서비스를 가져옴
import { useRouter } from 'next/navigation'; // Next.js 라우터를 가져옴

// 로그아웃을 처리하는 함수
export const handleLogout = async () => {
  const auth = getAuth(); // Firebase Authentication 인스턴스를 가져옴
  const router = useRouter(); // Next.js 라우터 인스턴스를 가져옴
  await auth.signOut(); // 사용자 로그아웃
  router.push('/'); // 로그아웃 후 홈 페이지로 이동
};
