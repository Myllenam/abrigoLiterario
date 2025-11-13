import SignUpForm from "../components/signUpForm";
import SignUpFormLogin from "../components/signUpFormLogin";

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen lg:h-screen bg-background-login">
      <SignUpFormLogin />
      <div className="flex-1 bg-background-login items-center flex flex-col justify-center">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
