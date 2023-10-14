"use client";
import { useState, useEffect } from "react";
import LoginModal from "./modal/login-modal";
import SignupModal from "./modal/signup-modal";
import UserUpdateModal from "./modal/user-update";
import EditUserVideoModal from "./modal/edit-user-video-modal";
import DeleteUserVideoModal from "./modal/delete-user-video-modal";
import SearchModal from "./modal/search-modal";
import UserPlaylistsModal from "./modal/user-playlists-modal";
import NewPlaylistModal from "./modal/new-playlist-modal";

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
      <EditUserVideoModal />
      <DeleteUserVideoModal />
      <SearchModal />
      <UserPlaylistsModal />
      <NewPlaylistModal />
    </>
  );
};
