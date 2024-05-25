// import { EmojiPicker } from "@/components/emoji-picker";
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
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/edgedb";
import { formatRelativeDate } from "@/lib/utils";
import { Fragment } from "react";
import { getPost } from "../../forum.actions";
import { NewCommentForm } from "./new-comment-form";

export default async function Post({
    params,
    searchParams: { page = "1", limit = "10" },
}: {
    params: {
        slug: string;
    };
    searchParams: { page?: string; limit?: string };
}) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    const { post, comments, total } = await getPost(params.slug, {
        page: parseInt(page) - 1,
        limit: parseInt(limit),
    });
    const pageAsNumber = parseInt(page);
    const limitAsNumber = parseInt(limit);

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
            <div className="flex gap-4 p-4">
                <div className="font-semibold text-xl">{post.title}</div>
                <div className="flex-grow" />
                <div>
                    <Badge>{post.category.name}</Badge>
                </div>
            </div>
            {pageAsNumber - 1 < 1 ? ( // yarn add @mdxeditor/editor
                <>
                    <Separator className="w-full" />
                    <div className="flex gap-4 p-4">
                        <div>
                            <Avatar>
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex">
                                <div className="font-semibold">
                                    {post.author.name}
                                </div>
                                <div className="flex-grow" />
                            </div>
                            <div>{post.content}</div>
                            <div className="text-xs text-muted-foreground">
                                {formatRelativeDate(post.created_at)}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {comments.length === 0 && (
                <div className="p-4">No comments yet.</div>
            )}
            {comments.map((comment) => (
                <Fragment key={comment.id}>
                    <Separator className="w-full" />
                    <div className="flex gap-4 p-4">
                        <div>
                            <Avatar>
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex">
                                <div className="font-semibold">
                                    {comment.author.name}
                                </div>
                                <div className="flex-grow" />
                            </div>
                            <div>{comment.content}</div>
                            <div className="text-xs text-muted-foreground">
                                {formatRelativeDate(comment.created_at)}
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
            <Pagination className="p-4">
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
                    {pageAsNumber !== totalPages && totalPages !== 0 ? (
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
            {signedIn && (
                <NewCommentForm category={post.category.id} post={post.id} />
            )}
        </div>
    );
}
