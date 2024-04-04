import { signInWithGooglePopup } from "@/lib/firebase.utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    navigate(from, { replace: true });
  };

  return <Button onClick={loginGoogleUser}>Login with Google</Button>;
};

export default GoogleAuthButton;
