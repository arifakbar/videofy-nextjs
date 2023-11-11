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

export default function UserSubscriptionsModal() {
  const { isOpen, type, data, onClose } = useModal();

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const { toAdd, videoId } = data;

  const isModalOpen = isOpen && type === "subscriptions";
  const router = useRouter();

  useEffect(() => {
    loadCurrentUser();
  }, [isOpen, session?.user]);

  const [subscriptions, setSubscriptions] = useState([]);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/currentUser");
      setSubscriptions(res.data.data.subscriptions);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onClick = (id) => {
    router.push(`/user/users/${id}`);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 pb-4 overflow-hidden">
        {loading ? (
          <div className="h-[250px] flex items-center justify-center">
            <SpinLoading />
          </div>
        ) : (
          <>
            <DialogHeader className="p-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Subscriptions
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[30vh]">
              <div className="flex flex-col w-full items-center justify-center gap-y-3">
                {subscriptions.length < 1 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    No Subscriptions yet!
                  </p>
                )}
                {subscriptions?.map((s) => {
                  return (
                    <div
                      onClick={() => onClick(s._id)}
                      key={s._id}
                      className="w-[90%] h-[40px] cursor-pointer flex items-center justify-between rounded-md border border-zinc-500 dark:border-zinc-400 p-2 dark:hover:bg-zinc-900 hover:text-black"
                    >
                      <p className="pr-2 transition text-start  font-semibold text-sm text-zinc-500 dark:text-zinc-400  ">
                        {s.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
