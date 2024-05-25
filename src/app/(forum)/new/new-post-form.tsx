"use client";

import { Form, FormField } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import ContentEditable from "@/components/ui/content-editable";
import { getCategories } from "@/app/shared.actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
            category: "",
            content: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true);
        const loadingId = toast.loading("Creating post...");

        try {
            // TODO: Create post
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
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
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
                    </div>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <ContentEditable
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </form>
            </div>
        </Form>
    );
};
