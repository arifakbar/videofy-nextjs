import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //For form Validation

import { Form, FormControl, FormField, FormItem } from "../ui/form";
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

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FileUpload from "../file-upload";
import { Separator } from "../ui/separator";
import axios from "axios";

const formSchema = z.object({
  thumbnail: z.string().min(3, "Thumbnail is required"),
  video: z.string().min(3, "Video is required"),
});

export default function CompleteVideoModal() {
  const { onOpen, isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "completeVideo";
  const router = useRouter();

  const { data: session } = useSession();

  const { info } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail: "",
      video: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      let newValues = { ...values, ...info, ...{ userId: session.user.id } };
      console.log("NV:", newValues);
      await axios.post("/api/user/video", newValues);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleBack = (e) => {
    e.stopPropagation();
    onOpen("newVideo");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            New Video
          </DialogTitle>
          <div className="absolute">
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={(e) => handleBack(e)}
            >
              Back
            </Button>
          </div>
          <DialogDescription className="text-center text-zinc-500">
            Upload your new video.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6 pb-6">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <label className="text-zinc-400 dark:text-zinc-500 font-semibold underline">
                      Thumbnail
                    </label>
                    <FormControl>
                      <FileUpload
                        endpoint="thumbnail"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <label className="text-zinc-400 dark:text-zinc-500 font-semibold underline">
                      Video
                    </label>
                    <FormControl>
                      <FileUpload
                        endpoint="newVideo"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100">
              <Button disabled={isLoading} variant="outline">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
