import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import {
  GoogleSignin,

} from "@react-native-google-signin/google-signin";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken.token);
    setUser(user);
    authStorage.storeToken(authToken.token);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return { user, logIn, logOut };
};


