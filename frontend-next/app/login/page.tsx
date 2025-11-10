import Image from "next/image";
import LoginForm from "./components/loginForm";

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen lg:h-screen bg-background-login">
      <div className="flex-1 bg-background-login flex flex-col items-center pt-[61px] gap-[15px] w-full">
        <Image
          src="/logo.svg"
          width={105}
          height={104}
          alt="logo"
        />
        <h1 className="font-medium text-background-login-two text-3xl">Bem-vindo de volta!</h1>
        <LoginForm />
      </div>

      <div className="hidden rounded-l-[40px]  lg:flex flex-1 bg-background-login-two flex-col items-center justify-center">
        <p>oi</p>
      </div>
    </div>
  );
};

export default Page;
