"use client";

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
import { Separator } from "@/components/ui/separator";
import { handleEmailPasswordSignUp } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { RiArrowRightLine } from "react-icons/ri";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "The passwords do not match",
            });
        }
    });

export default function RegisterForm({
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
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const loadingId = toast.loading("Registering...", {
            description:
                "Please hold on while our specialized team of space rabbits create your account",
        });

        try {
            await handleEmailPasswordSignUp(data);
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
            <div className="relative bg-muted rounded-md shadow-lg border border-solid w-[380px] max-w-full">
                <div className="rounded-md p-8 flex flex-col items-center bg-background border-b border-solid">
                    <Link href="/">
                        <img
                            className="h-8 mb-8"
                            src="/logo.svg"
                            alt="my logo"
                        />
                    </Link>
                    <h1 className="font-semibold mb-2">
                        Register for Superstack
                    </h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        Hello! Please register to continue
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
                        <span className="text-muted-foreground text-xs px-2">
                            OR
                        </span>
                        <Separator className="flex-1" />
                    </div>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
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
                                        <Input type="email" {...field} />
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
                                        <Input type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="w-full mb-8 text-muted-foreground">
                                    <div className="flex justify-between items-center gap-4">
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormMessage className="text-xs opacity-80 font-normal text-right" />
                                    </div>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full gap-2"
                            disabled={loading}
                        >
                            <span>Continue</span>
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <RiArrowRightLine />
                            )}
                        </Button>
                    </form>
                </div>
                <div className="p-4 text-center text-sm">
                    <span className="text-muted-foreground/80">
                        Have an account?{" "}
                    </span>
                    <Link href="/auth/login">Login</Link>
                </div>
            </div>
        </Form>
    );
}
