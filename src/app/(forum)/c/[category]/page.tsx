import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import { getPostsForCat } from "../../forum.actions";

export default async function CategoryPage({
    params,
    searchParams: { page = "1", limit = "20" },
}: {
    params: {
        category: string;
    };
    searchParams: { page?: string; limit?: string };
}) {
    const pageAsNumber = parseInt(page);
    const limitAsNumber = parseInt(limit);
    const { posts, total } = await getPostsForCat(params.category, {
        page: pageAsNumber - 1,
        limit: limitAsNumber,
    });
    const totalPages = Math.ceil(total / limitAsNumber);

    const renderPaginationItems = () => {
        const paginationItems = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href={`?page=${i}&limit=${limitAsNumber}`}
                            isActive={i === pageAsNumber}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            paginationItems.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href={`?page=1&limit=${limitAsNumber}`}
                        isActive={1 === pageAsNumber}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (pageAsNumber > 3) {
                paginationItems.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const startPage = Math.max(2, pageAsNumber - 1);
            const endPage = Math.min(totalPages - 1, pageAsNumber + 1);

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href={`?page=${i}&limit=${limitAsNumber}`}
                            isActive={i === pageAsNumber}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (pageAsNumber < totalPages - 2) {
                paginationItems.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            paginationItems.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href={`?page=${totalPages}&limit=${limitAsNumber}`}
                        isActive={totalPages === pageAsNumber}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return paginationItems;
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center">
                <h1 className=" text-2xl font-semibold">{params.category}</h1>
            </div>
            <div className="flex flex-col">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/p/${post.slug}`}
                        className="flex gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                    >
                        <div>
                            <Avatar>
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h2 className="font-semibold">{post.title}</h2>
                            <p className="text-xs text-muted-foreground">
                                Posted by{" "}
                                <span className="font-semibold">
                                    {post.author.name}
                                </span>{" "}
                                {formatRelativeDate(post.created_at)}
                            </p>
                        </div>
                        <div className="flex-grow" />
                        <div>
                            <Badge>{post.category.name}</Badge>
                        </div>
                    </Link>
                ))}
                <Pagination>
                    <PaginationContent>
                        {pageAsNumber !== 1 ? (
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`?page=${
                                        pageAsNumber - 1
                                    }&limit=${limitAsNumber}`}
                                />
                            </PaginationItem>
                        ) : null}
                        {totalPages > 1 && renderPaginationItems()}
                        {pageAsNumber !== totalPages ? (
                            <PaginationItem>
                                <PaginationNext
                                    href={`?page=${
                                        pageAsNumber + 1
                                    }&limit=${limitAsNumber}`}
                                />
                            </PaginationItem>
                        ) : null}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
