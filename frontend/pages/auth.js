import LoginForm from "../components/LoginForm";
import WrappedSignUpForm from "../components/SignupForm";

const AuthPage = () => {
  return (
    <div>
      <WrappedSignUpForm />
      <LoginForm />
    </div>
  );
};

export default AuthPage;
