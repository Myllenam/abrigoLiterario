"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignUpFormLogin = () => {
  const router = useRouter();
  return (
    <div className="hidden rounded-r-[40px]  lg:flex flex-1 bg-background-login-two flex-col items-center pt-21">
      <div className="flex flex-col items-center gap-3 pb-22">
        <Image src="/logo.svg" width={120} height={127} alt="logo" />
        <h2 className="font-bold text-3xl text-white font-fredoka">
          Abrigo Literário
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        <p className="font-medium text-white text-sm">
          Já possui um conta? Entre agora!
        </p>
        <Button className="w-[185px] " onClick={() => router.push("/login")}>
          SIGN IN
        </Button>
      </div>
    </div>
  );
};

export default SignUpFormLogin;
