import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //For form Validation

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";

import { useModal } from "@/hooks/use-modal";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "The email is required.")
    .email({ message: "The email is invalid." }),
  password: z.string().min(6),
});

export default function LoginModal() {
  const { onOpen, isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "login";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = () => {
    alert("Logged In");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Login
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Browse and manage your stacks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zonc-500 dark:text-secondary/70">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:border dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zonc-500 dark:text-secondary/70">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 dark:border dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        disabled={isLoading}
                        type="password"
                        placeholder="Enter you password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogDescription className="flex gap-1 text-xs text-zinc-500 ml-6">
              Don't have an account?
              <p
                className="cursor-pointer underline text-red-500/75"
                onClick={() => onOpen("signup")}
              >
                Create one.
              </p>
            </DialogDescription>
            <DialogFooter className="bg-gray-100">
              <Button disabled={isLoading} variant="outline">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
