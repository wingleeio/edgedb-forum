"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Role } from "@/dbschema/interfaces";

import { getCategories } from "@/app/shared.actions";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateCategory } from "./dashboard.actions";

export function EditCategory({
    category,
}: {
    category: Awaited<ReturnType<typeof getCategories>>[0];
}) {
    const [name, setName] = useState(category.name);
    const [slug, setSlug] = useState(category.slug);
    const [role, setRole] = useState<Role>(category.allowed);
    const router = useRouter();

    const handleSubmit = async () => {
        const loadingId = toast.loading("Updating category...");

        try {
            await updateCategory(category.id, { name, allowed: role, slug });
            toast.success("Category updated successfully");
            router.refresh();
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
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-2">
                    <Edit className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Edit Category
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Update the details of the category.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">
                            Slug
                        </Label>
                        <Input
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Permissions
                        </Label>
                        <Select
                            onValueChange={(value) => setRole(value as Role)}
                            value={role}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={!name}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
