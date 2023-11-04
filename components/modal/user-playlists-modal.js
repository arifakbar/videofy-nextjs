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
import { MinusSquare, PlusSquare, Trash2 } from "lucide-react";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import SpinLoading from "../spinLoading";

export default function UserPlaylistsModal() {
  const { isOpen, type, data, onClose, onOpen } = useModal();
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const { toAdd, videoId } = data;

  const isModalOpen = isOpen && type === "playlists";
  const router = useRouter();

  useEffect(() => {
    loadPlaylists();
  }, [isOpen, session?.user]);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/playlists`);
      setPlaylists(res.data.data.userPlaylists);
      // console.log(res.data.data.userPlaylists);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onClick = (id) => {
    onClose();
    router.push(`/user/playlist/${id}`);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/playlists/${id}`);
      setLoading(false);
      loadPlaylists();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleAdd = async (id) => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/playlists/${id}`, {
        videoId,
        type: "add",
      });
      setLoading(false);
      loadPlaylists();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/playlists/${id}`, {
        videoId,
        type: "remove",
      });
      setLoading(false);
      loadPlaylists();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        {loading ? (
          <div className="h-[250px] flex items-center justify-center">
            <SpinLoading />
          </div>
        ) : (
          <>
            <DialogHeader className="p-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Your Playlists
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[30vh]">
              <div className="flex flex-col w-full items-center justify-center gap-y-3">
                {playlists.length < 1 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    No Playlists yet! Create one.
                  </p>
                )}
                {playlists?.map((p) => {
                  return (
                    <div
                      key={p._id}
                      className="w-[90%] h-[40px] flex items-center justify-between rounded-md border border-zinc-500 dark:border-zinc-400 p-2"
                    >
                      <p
                        onClick={() => onClick(p._id)}
                        className="pr-2 transition text-start cursor-pointer font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-white hover:text-black "
                      >
                        {p.name}
                      </p>
                      {!toAdd ? (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <ActionTooltip label="Delete">
                              <Trash2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 transition cursor-pointer" />
                            </ActionTooltip>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete {p?.name}{" "}
                                Playlist?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(p._id)}
                              >
                                Yes
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            {!p.videos.includes(videoId) ? (
                              <ActionTooltip label="Add">
                                <PlusSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-500 transition cursor-pointer" />
                              </ActionTooltip>
                            ) : (
                              <ActionTooltip label="Remove">
                                <MinusSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 transition cursor-pointer" />
                              </ActionTooltip>
                            )}
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              {!p.videos.includes(videoId) ? (
                                <AlertDialogTitle>
                                  Add to {p?.name} Playlist?
                                </AlertDialogTitle>
                              ) : (
                                <AlertDialogTitle>
                                  Remove from {p?.name} Playlist?
                                </AlertDialogTitle>
                              )}
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No</AlertDialogCancel>
                              {!p.videos.includes(videoId) ? (
                                <AlertDialogAction
                                  onClick={() => handleAdd(p._id)}
                                >
                                  Yes
                                </AlertDialogAction>
                              ) : (
                                <AlertDialogAction
                                  onClick={() => handleRemove(p._id)}
                                >
                                  Yes
                                </AlertDialogAction>
                              )}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  );
                })}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
