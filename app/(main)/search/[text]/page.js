"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //For form Validation

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

import { Search as S } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SearchCard from "@/components/card/search-card";

const formSchema = z.object({
  text: z.string().min(3, "Min. 3 alphabets are required."),
});

export default function Search() {
  const params = useParams();
  const initialText = params.text;

  useEffect(() => {
    if (initialText) {
      console.log("Fetching data");
    }
  }, [initialText]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      router.push(values.text);
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 md:px-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-x-2">
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 h-[50px] dark:border dark:text-white border border-b-white border-b-2 dark:border-b-2 dark:border-b-zinc-500 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Search"
                        {...field}
                      />
                      <Button
                        disabled={isLoading}
                        variant="outline"
                        className="h-[50px] w-[80px]"
                      >
                        <S className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Separator className="my-4 bg-zinc-500 dark:bg-zinc-400" />
      <div className="flex flex-col gap-y-6">
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
    </div>
  );
}
