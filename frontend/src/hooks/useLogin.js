import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// sign up, send request, get response back, if successful-> do something

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    // every time this function is called, reset error to be null
    setError(null);

    // post request
    // because of proxy in package.json i don't need to write localhost4000
    const response = await fetch('/api/user/login', {
      method: 'POST',
      // 컨텐트 타입을 json으로 보내기
      headers: { 'Content-Type': 'application/json' },
      // email과 pw를 json으로 바꿔서 보내기
      body: JSON.stringify({ email, password }),
    });
    // here if it fails, it would send us error as 'json.error'
    const json = await response.json();
    // 만약에 response.ok가 안나오면, = fail하면
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    // request성공한다면,
    if (response.ok) {
      // localstorage에 user를 저장.
      //  데이터의 이름은 user로 하고, json을 저장
      //   stringfy하는 이유는 -> localstorage엔 string으로 저장해야해서
      localStorage.setItem('user', JSON.stringify(json));
    }

    // update auth context -> useContext를 사용하기 (내 경우엔 redux)
    dispatch({ type: 'LOGIN', payload: json });
    setIsLoading(false);
  };

  return { login, isLoading, error };
};
