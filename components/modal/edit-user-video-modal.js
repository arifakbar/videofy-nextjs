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

const formSchema = z.object({
  name: z.string().min(3, "Name is required."),
  profilePic: z.string().min(3, "Profile pic is required."),
});

export default function EditUserVideoModal() {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "editUserVideo";
  const router = useRouter();

  const { user } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      profilePic: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user?.name);
      form.setValue("profilePic", user?.profilePic);
    }
  }, [form, data]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
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
            Edit Video
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Make your profile more like you.
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
