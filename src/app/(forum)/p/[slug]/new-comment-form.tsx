"use client";

import { Form, FormField } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import ContentEditable from "@/components/ui/content-editable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createComment } from "../../forum.actions";

const schema = z.object({
    content: z.string().min(1),
});

export const NewCommentForm = ({
    category,
    post,
}: {
    category: string;
    post: string;
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const loadingId = toast.loading("Creating comment...");

        try {
            await createComment({
                ...data,
                category,
                post,
            });
            toast.success("Comment created");
            router.refresh();
            form.reset();
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
            <div className="p-4 border-solid border rounded-md">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <ContentEditable
                                placeholder="Write a comment"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="w-full gap-2"
                            disabled={loading}
                        >
                            <span>Reply</span>
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : null}
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    );
};
