"use client";
import { useState, useEffect } from "react";
import LoginModal from "./modal/login-modal";
import UserUpdateModal from "./modal/user-update";
import EditUserVideoModal from "./modal/edit-user-video-modal";
import DeleteUserVideoModal from "./modal/delete-user-video-modal";
import SearchModal from "./modal/search-modal";
import UserPlaylistsModal from "./modal/user-playlists-modal";
import NewPlaylistModal from "./modal/new-playlist-modal";
import NewVideoModal from "./modal/new-video-modal";
import CompleteVideoModal from "./modal/complete-video-modal";
import UserSubscriptionsModal from "./modal/subscriptions-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <LoginModal />
      <UserUpdateModal />
      <EditUserVideoModal />
      <DeleteUserVideoModal />
      <SearchModal />
      <UserPlaylistsModal />
      <NewPlaylistModal />
      <NewVideoModal />
      <CompleteVideoModal />
      <UserSubscriptionsModal />
    </>
  );
};
