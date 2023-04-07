import React, {createContext} from 'react';

const AuthContext = createContext({} as any);
const useAuth = () => {
  return React.useContext(AuthContext);
};

const Authentication = ({children}: any) => {
  return (
    <AuthContext.Provider
      value={{
        name: 'Ca',
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {Authentication, useAuth};
