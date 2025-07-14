// src/components/Signup/SignupLayout.tsx

import React, { ReactNode } from "react";
import Image from "next/image";
// import rightImage from "../../../public/rightloginimage.png";
// import Logo from "../../../public/Shape.png";

type SignupLayoutProps = {
  children: ReactNode;
};

const SignupLayout = ({ children }: SignupLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="w-full md:w-1/2 relative flex flex-col px-8 md:px-24 py-8">
        {/* Logo */}
        <div className="absolute top-14 left-8 md:left-24 flex items-center space-x-2">
          {/* <Image src={Logo} alt="Tivro Logo" width={24} height={24} /> */}
          <span className="font-bold text-xl text-black">Tivro</span>
        </div>

        {/* Form area */}
        <div className="flex-grow flex flex-col justify-center mt-12">
          <h2 className="text-2xl font-bold text-black mb-1">Admin Signup</h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill the form to create an admin account
          </p>
          {children}
        </div>
      </div>

      {/* Right image panel */}
      <div className="hidden md:block md:w-1/2 relative">
        {/* <Image
          src={rightImage}
          alt="Signup illustration"
          layout="fill"
          objectFit="cover"
          className="rounded-l-none"
        /> */}
      </div>
    </div>
  );
};

export default SignupLayout;
