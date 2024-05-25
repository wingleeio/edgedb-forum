import { getCategories } from "@/app/shared.actions";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddCategory } from "./add-category";
import { EditCategory } from "./edit-category";

export default async function Dashboard() {
    const categories = await getCategories();
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <AddCategory />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                        Manage the categories of your forum
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Posts
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Comments
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {category.post_count}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {category.comment_count}
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <EditCategory category={category} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
