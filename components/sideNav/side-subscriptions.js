import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
import { useEffect, useState } from "react";
import axios from "axios";

export default function SideSubscriptions() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const res = await axios.get("/api/user/currentUser");
      console.log("SUBS: ", res.data.data);
      setSubscriptions(res.data.data.subscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = (id) => {
    router.push(`/user/users/${id}`);
  };

  const subs = [1, 2, 3];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Subscriptions
          </p>
        </AccordionTrigger>
        {subscriptions?.map((s) => {
          return (
            <AccordionContent key={s}>
              <button
                className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                onClick={() => onClick(s._id)}
              >
                <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
                  {s.name}
                </p>
              </button>
            </AccordionContent>
          );
        })}
        {subscriptions.length < 1 && (
          <AccordionContent>
            <button className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
              <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
                No Subscriptions Yet!
              </p>
            </button>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
}
