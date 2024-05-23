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
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { RiArrowRightLine } from "react-icons/ri";
import { handleEmailPasswordSignIn } from "@/lib/auth";
import { handleOnboarding } from "./onboarding.actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1),
});

export default function OnboardingForm() {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const loadingId = toast.loading("Onboarding...", {
            description:
                "Please hold on while we finish setting up your account",
        });

        try {
            await handleOnboarding(data.name);
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
                <div className="rounded-md p-8 flex flex-col bg-background">
                    <Link href="/">
                        <img
                            className="h-8 mb-8"
                            src="/logo.svg"
                            alt="my logo"
                        />
                    </Link>
                    <h1 className="font-semibold mb-2">Let's get started</h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        Fill in a few more details to continue
                    </p>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full mb-4 text-muted-foreground">
                                    <div className="flex justify-between items-center gap-4">
                                        <FormLabel className="whitespace-nowrap">
                                            Display Name
                                        </FormLabel>
                                        <FormMessage className="text-xs opacity-80 font-normal text-right" />
                                    </div>
                                    <FormControl>
                                        <Input {...field} />
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
            </div>
        </Form>
    );
}
