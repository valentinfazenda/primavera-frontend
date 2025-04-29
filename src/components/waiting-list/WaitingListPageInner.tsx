"use client";

import loginbg from "@/assets/img/bg/login-bg.png";
import logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WaitingForm from "./form/WaitingForm";

const WaitingListPageInner = () => {
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/home");

  useEffect(() => {
    const url = searchParams.get("callbackUrl");
    if (url) setCallbackUrl(url);
  }, [searchParams]);

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="h-screen hidden items-center justify-center lg:flex">
          <Image src={loginbg} alt="" className="h-screen" />
          <div className="absolute p-3">
            <h2 className="text-white text-center text-[50px] font-normal leading-[120%]">
              Long-term <br /> memory for{" "}
              <span className="text-[#7AB9ED] text-[50px]">AI</span>
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-screen px-6 lg:px-[100px]">
          <div
            className="w-full md:w-[550px] lg:w-full mx-auto p-[40px] sm:px-6 border "
            style={{ boxShadow: "0px 0px 8px 15px #0065FF1A" }}
          >
            <div className="w-full">
              <div className="flex items-center justify-center mb-8">
                <Image src={logo} alt="" className="h-[80px] w-full" />
              </div>
              <div className="max-w-sm mx-auto">
                <WaitingForm callbackUrl={callbackUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListPageInner;
