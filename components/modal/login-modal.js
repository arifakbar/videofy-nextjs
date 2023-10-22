import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

import { useState } from "react";
import SpinLoading from "../spinLoading";

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const { onOpen, isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "login";

  const handleClose = () => {
    onClose();
  };

  const handleGoogleLogin = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await signIn("google");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleGitHUBLogin = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await signIn("github");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
      {loading ? 
        <div className="h-[250px] flex items-center justify-center">
          <SpinLoading />
        </div> :
        <>
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Login
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Browse and manage your stacks.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center justify-between mb-4">
              <div
                onClick={(e) => handleGoogleLogin(e)}
                className="
            flex rounded-md py-[8px] cursor-pointer items-center justify-center gap-1 w-[90%] mx-7 bg-red-500 dark:bg-red-500 text-white dark:text-white hover:bg-red-400 dark:hover:bg-red-400 transition"
              >
                <p>Continue with Google</p>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div
                onClick={(e) => handleGitHUBLogin(e)}
                className="
            flex rounded-md py-[8px] cursor-pointer items-center justify-center gap-1 w-[90%] mx-7 bg-green-500 dark:bg-green-500 text-white dark:text-white hover:bg-green-400 dark:hover:bg-green-400 transition"
              >
                <p>Continue with GitHub</p>
                <ArrowRight className="w-4 h-4" />
              </div>
        </div></>
      }
      </DialogContent>
    </Dialog>
  );
}
