import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal";

import { useRouter } from "next/navigation";
import SpinLoading from "../spinLoading";
import axios from "axios";

export default function DeleteUserVideoModal() {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "deleteUserVideo";
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { videoId } = data;

  const deleteVideo = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/video/${videoId}`);
      onClose();
      setLoading(false);
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        {loading ? (
          <div className="h-[250px] flex items-center justify-center">
            <SpinLoading />
          </div>
        ) : (
          <>
            <DialogHeader className="p-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Delete Video
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                Are you sure you want to delete this video?
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex items-center justify-evenly mb-3">
              <Button variant="destructive" onClick={deleteVideo}>
                Yes
              </Button>
              <Button variant="outline" onClick={onClose}>
                No
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
