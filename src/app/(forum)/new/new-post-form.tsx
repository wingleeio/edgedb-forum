"use client";

import { Form, FormField } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { getCategories } from "@/app/shared.actions";
import { ForwardRefEditor } from "@/components/editor/ForwardRefEditor";
import { Button } from "@/components/ui/button";
import ContentEditable from "@/components/ui/content-editable";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import "@mdxeditor/editor/style.css";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createPost } from "./new.actions";

const schema = z.object({
    category: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
});

export const NewPostForm = ({
    categories,
}: {
    categories: Awaited<ReturnType<typeof getCategories>>;
}) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            category: categories[0].id,
            content: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const loadingId = toast.loading("Creating post...");

        try {
            await createPost(data);
            toast.success("Post created");
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
                <ForwardRefEditor markdown="hello world" />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <Input
                                    placeholder="Conversation Title"
                                    className="outline-none focus:outline-none border-none focus-visible:ring-0"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <ContentEditable
                                placeholder="Write a post"
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
                            <span>Submit Post</span>
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
