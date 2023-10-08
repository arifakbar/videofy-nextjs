import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function SideSubscriptions() {
  const router = useRouter();

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
        {subs?.map((s) => {
          return (
            <AccordionContent key={s}>
              <button
                className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                onClick={() => onClick(s)}
              >
                <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
                  Subscription {s}
                </p>
              </button>
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
}
