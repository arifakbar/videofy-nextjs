"use client";
import { useState, useEffect } from "react";
import LoginModal from "./modal/login-modal";
import SignupModal from "./modal/signup-modal";
import UserUpdateModal from "./modal/user-update";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <LoginModal />
      <SignupModal />
      <UserUpdateModal />
    </>
  );
};
