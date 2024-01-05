"use client";
import React, { useState } from "react";
import { CreateProfileCard } from "@/app/(root)/profile/create-profile";

const OnboardingPage = () => {
  return (
    <div className="h-full flex-grow w-full flex flex-col justify-center items-center gap-4 px-4">
      <h1 className="text-5xl font-bold mb-8">keepshipping</h1>
      <CreateProfileCard />
    </div>
  );
};

export default OnboardingPage;
