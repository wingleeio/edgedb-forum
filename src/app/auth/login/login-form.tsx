"use client";

import { FaDiscord, FaGithub } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { RiArrowRightLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { handleEmailPasswordSignIn } from "@/lib/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm({
  githubHref,
  discordHref,
}: {
  githubHref: string;
  discordHref: string;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    const loadingId = toast.loading("Logging in...", {
      description:
        "Please hold on while our specialized team of space rabbits verify your credentials",
    });

    try {
      await handleEmailPasswordSignIn(data);
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error("Error", {
        description: `${errorMessage}`,
      });
    } finally {
      toast.dismiss(loadingId);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="relative bg-muted rounded-md shadow-lg border border-solid w-[380px] max-w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="rounded-md p-8 flex flex-col items-center bg-background border-b border-solid">
          <Link href="/">
            <img className="h-8 mb-8" src="/logo.svg" alt="my logo" />
          </Link>
          <h1 className="font-semibold mb-2">Login to Superstack</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Welcome back! Please login to continue
          </p>
          <div className="flex gap-2 w-full mb-4">
            <Link href={githubHref} className="flex-1">
              <Button variant="outline" className="w-full gap-4">
                <FaGithub className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={discordHref} className="flex-1">
              <Button variant="outline" className="w-full gap-4">
                <FaDiscord className="h-5 w-5 fill-[#7289da]" />
              </Button>
            </Link>
          </div>
          <div className="mb-4 w-full flex items-center">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs px-2">OR</span>
            <Separator className="flex-1" />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mb-4 text-muted-foreground">
                <div className="flex justify-between items-center gap-4">
                  <FormLabel>Email Address</FormLabel>
                  <FormMessage className="text-xs opacity-80 font-normal text-right" />
                </div>
                <FormControl>
                  <Input className="h-8" type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full mb-4 text-muted-foreground">
                <div className="flex justify-between items-center gap-4">
                  <FormLabel>Password</FormLabel>
                  <FormMessage className="text-xs opacity-80 font-normal text-right" />
                </div>
                <FormControl>
                  <Input className="h-8" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <span>Continue</span>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RiArrowRightLine />
            )}
          </Button>
        </div>
        <div className="p-4 text-center text-sm">
          <span className="text-muted-foreground/80">
            Don't have an account?{" "}
          </span>
          <Link href="/auth/register">Register</Link>
        </div>
      </form>
    </Form>
  );
}
