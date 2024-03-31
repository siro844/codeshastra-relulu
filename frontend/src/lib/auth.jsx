import { app } from "@/config/firebase";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from "firebase/auth";
  import React from "react";
  const auth = getAuth(app);
  
  export const AuthContext = React.createContext({});
  
  export const useAuth = () => React.useContext(AuthContext);
  
  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user }}>
        {loading ? (
          <div className="h-screen flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
          children
        )}
      </AuthContext.Provider>
    );
  };
  
