import { createContext } from 'react';

const initialAuthContext = {
  token: null,
  isAuth: false,
  getToken: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(initialAuthContext);

export default AuthContext;
