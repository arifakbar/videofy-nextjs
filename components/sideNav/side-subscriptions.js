import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function SideSubscriptions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Subscriptions
          </p>
        </AccordionTrigger>
        <AccordionContent>
          <button className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Subscriptions 1
            </p>
          </button>
        </AccordionContent>
        <AccordionContent>
          <button className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Subscriptions 2
            </p>
          </button>
        </AccordionContent>
        <AccordionContent>
          <button className="group px-2 py-2 rounded-md flex items-center w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Subscriptions 3
            </p>
          </button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
