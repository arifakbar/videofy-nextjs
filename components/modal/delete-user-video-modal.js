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

export default function DeleteUserVideoModal() {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "deleteUserVideo";
  const router = useRouter();

  const { video, user } = data;

  const onSubmit = async () => {
    try {
      alert("Delete");
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Video
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this video?
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-evenly mb-3">
          <Button variant="destructive" onClick={onSubmit}>
            Yes
          </Button>
          <Button variant="outline">No</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
