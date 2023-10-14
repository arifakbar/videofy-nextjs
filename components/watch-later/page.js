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
import { useState } from "react";

export default function WatchLater({ id }) {
  const [added, setAdded] = useState(true);

  const onClick = (id) => {
    setAdded(!added);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" onClick={() => onClick(1)}>
          {added ? "Add to Watch Later" : "Remove from watch later"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {!added ? "Added to Watch Later" : "Removed from watch later"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
