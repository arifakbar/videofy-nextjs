import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SpinLoading from "../spinLoading";
import axios from "axios";

export default function WatchLater({ videoId, user }) {
  const [added, setAdded] = useState(true);
  const [loading, setLoading] = useState(false);
  let type = "";

  useEffect(() => {
    check();
  }, [videoId, user]);

  const check = () => {
    if (user?.watchLater.includes(videoId)) {
      setAdded(false);
      type = "remove";
    }
  };

  const onClick = async () => {
    setAdded(!added);
    try {
      setLoading(true);
      added ? (type = "add") : (type = "remove");
      const res = await axios.patch(`/api/user/video/${videoId}/watch_later`, {
        type,
      });
      console.log("RDD: ", res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" onClick={() => onClick(1)}>
          {added ? "Add to Watch Later" : "Remove from watch later"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {loading ? (
          <div className="h-[150px] flex items-center justify-center">
            <SpinLoading />
          </div>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {!added ? "Added to Watch Later" : "Removed from watch later"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
