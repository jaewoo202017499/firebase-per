import { initializeApp } from "firebase/app"; // Firebase 앱 초기화를 위한 모듈
import { getAnalytics, isSupported } from "firebase/analytics"; // Firebase Analytics 모듈 및 지원 여부 확인 함수
import { getFirestore } from "firebase/firestore"; // Firestore 데이터베이스 모듈
import { getAuth } from "firebase/auth"; // Firebase Authentication 모듈

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyAKvCrgm07W0AAsiigGcRMNIthkQXFyVLo",
  authDomain: "lostos--helm.firebaseapp.com",
  projectId: "lostos--helm",
  storageBucket: "lostos--helm.appspot.com",
  messagingSenderId: "219010564857",
  appId: "1:219010564857:web:54150031495160d1541828",
  measurementId: "G-GCRPRENRM5"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

let analytics;
// 클라이언트 환경에서만 Firebase Analytics 초기화
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Firestore 데이터베이스 초기화
const db = getFirestore(app);

// Firebase Authentication 초기화
const auth = getAuth(app);

export { app, analytics, db, auth };
