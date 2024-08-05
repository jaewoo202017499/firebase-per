// 스크롤을 맨 아래로 이동시키는 함수
// ref: 스크롤할 요소에 대한 ref 객체
export const scrollToBottom = (ref) => {
    // ref 객체가 존재하면 스크롤을 부드럽게 이동시킴
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  