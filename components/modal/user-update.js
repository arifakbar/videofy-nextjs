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
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(3, "Name is required."),
  // profilePic: z.string().min(3, "Profile pic is required."),
});

export default function UserUpdateModal() {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "userUpdate";
  const router = useRouter();

  const {data:session, update} = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // profilePic: "",
    },
  });

  console.log(session?.user);

  useEffect(() => {
    if (session && session.user) {
      form.setValue("name", session.user?.name);
      // form.setValue("profilePic", user?.profilePic);
    }
  }, [form, session]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const res = await axios.patch('/api/user/currentUser',values);
      // await update({name:res.data.data.name});
      // session.user.name = res.data.data.name;
      handleClose();
      router.refresh('/');
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Update User
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give you profile a personality.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zonc-500 dark:text-secondary/70">
                      Display Name
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
            </div>
            <DialogFooter className="bg-gray-100">
              <Button disabled={isLoading} variant="outline">
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
