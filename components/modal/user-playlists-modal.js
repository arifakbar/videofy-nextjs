import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal";

import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { PlusSquare, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ActionTooltip from "../ui/action-tooltip";

export default function UserPlaylistsModal() {
  const { isOpen, type, data, onClose, onOpen } = useModal();

  const isModalOpen = isOpen && type === "playlists";
  const router = useRouter();

  const onClick = (id) => {
    router.push(`/user/playlist/${id}`);
  };

  const { toAdd } = data;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = (id) => {
    alert(`Delete ${id}`);
  };

  const handleAdd = (id) => {
    alert(`Add ${id}`);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Your Playlists
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[30vh]">
          <div className="flex flex-col w-full items-center justify-center gap-y-3">
            <div className="w-[90%] h-[40px] flex items-center justify-between rounded-md border border-zinc-500 dark:border-zinc-400 p-2">
              <p
                onClick={() => onClick(1)}
                className="pr-2 transition text-start cursor-pointer transition font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-white hover:text-black "
              >
                Playlist 1
              </p>
              {!toAdd ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <ActionTooltip label="Delete">
                      <Trash2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 transition cursor-pointer" />
                    </ActionTooltip>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this Playlist?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(1)}>
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <ActionTooltip label="Add">
                      <PlusSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-500 transition cursor-pointer" />
                    </ActionTooltip>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Add to this Playlist?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleAdd(1)}>
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="bg-gray-100">
          {toAdd ? (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          ) : (
            <Button variant="outline" onClick={() => onOpen("newPlaylist")}>
              New Playlists
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
