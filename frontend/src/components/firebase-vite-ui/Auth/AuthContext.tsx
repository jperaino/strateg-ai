import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase.utils";
import { DocumentReference, doc } from "firebase/firestore";
interface IAuthContext {
  user: User | null;
  userRef: DocumentReference | null;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
const Provider = AuthContext.Provider;
const Consumer = AuthContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const args = React.useContext(AuthContext);

  if (!args) {
    throw new Error(
      "Cannot use this component outside of a valid AuthContext context."
    );
  }

  return args;
};

const AuthContextProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRef, setUserRef] = useState<DocumentReference | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && db) {
        setUserRef(doc(db, "users", currentUser.uid));
      }

      setIsAuthenticating(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Provider
      value={{
        user,
        userRef,
      }}
    >
      {!isAuthenticating && props.children}
    </Provider>
  );
};

export { AuthContext, AuthContextProvider, Consumer as AuthContextConsumer };
export default AuthContext;
