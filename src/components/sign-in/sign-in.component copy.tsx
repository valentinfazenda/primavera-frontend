"use client";

import loginbg from "@/assets/img/bg/login-bg.png";
import {
  faApple,
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignInForm from "./form/sign-in-form.component";

const SignInPageInner = () => {
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/home");

  useEffect(() => {
    const url = searchParams.get("callbackUrl");
    if (url) setCallbackUrl(url);
  }, [searchParams]);

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="h-screen flex items-center justify-center">
          <Image src={loginbg} alt="" className="h-screen" />
          <div className="absolute p-3">
            <h2 className="text-white text-center text-[50px] font-normal leading-[120%]">
              Long-term <br /> memory for{" "}
              <span className="text-[#7AB9ED] text-[50px]">AI</span>
            </h2>
          </div>
        </div>
        <div className="md:flex items-center justify-center h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-[36px]">
                <h1 className="h1 mb-3">Se connecter</h1>
                <p>
                  Nouveau sur Primavera?{" "}
                  <Link
                    href="/waiting-list"
                    className="underline font-medium hover:text-blue-600"
                  >
                    Rejoindre la liste d’attente
                  </Link>
                </p>
              </div>
              <div className="max-w-sm mx-auto">
                <SignInForm callbackUrl={callbackUrl} />
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 grow mr-3" />
                  <div className="text-gray-600 italic">Ou</div>
                  <div className="border-t border-gray-300 grow ml-3" />
                </div>
                <form className="flex items-center justify-center gap-4">
                  <button className="flex items-center justify-center text-center p-3 m-auto border rounded-3xl bg-transparent hover:bg-blue-600 hover:text-white w-full">
                    <FontAwesomeIcon icon={faFacebook} className="icons" />
                  </button>
                  <button className="flex items-center justify-center text-center p-3 border rounded-3xl bg-transparent hover:bg-blue-600 hover:text-white w-full">
                    <FontAwesomeIcon icon={faGoogle} className="icons" />
                  </button>
                  <button className="flex items-center justify-center text-center p-3 border rounded-3xl bg-transparent hover:bg-blue-600 hover:text-white w-full">
                    <FontAwesomeIcon icon={faApple} className="icons" />
                  </button>
                  <button className="flex items-center justify-center text-center p-3 border rounded-3xl bg-transparent hover:bg-blue-600 hover:text-white w-full">
                    <FontAwesomeIcon icon={faTwitter} className="icons" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPageInner;
