import { store } from '@/store/store';

export function isAuthenticated() {
  const { token } = store.getState().auth;
  return !!token;
}
