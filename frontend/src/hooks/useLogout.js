import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // 1. remove token from storage
    localStorage.removeItem('user');

    // 2. dispatch context
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
