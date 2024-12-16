"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "./ui/sparkles";
import { GoogleIcon } from "./ui/google-icon";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { HoverButton } from "./ui/hover-button";
import { JSX } from "react";

export const LoginComp = (): JSX.Element => (
  <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 w-full h-full">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-3xl" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="relative shadow-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <h2 className="text-3xl font-bold text-white mb-4">
          <TextGenerateEffect words="Welcome to Our Stellar Platform" />
        </h2>
        <p className="text-gray-300 mb-8">
          Embark on a journey beyond imagination
        </p>
        <HoverButton
          onClick={() => {
            console.log("Google login clicked");
          }}
        >
          <GoogleIcon className="w-5 h-5 mr-2" />
          Log In with Google
        </HoverButton>
      </div>
    </motion.div>
  </div>
);
