import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatRelativeDate(inputDate: Date): string {
    const now = new Date();
    const diffMilliseconds = now.getTime() - inputDate.getTime();
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
        return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return "1 day ago";
    } else if (diffDays === 2) {
        return "2 days ago";
    } else if (diffDays === 7) {
        return "1 week ago";
    } else if (diffDays > 7) {
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "2-digit",
            year: "numeric",
        };
        return `on ${inputDate.toLocaleDateString("en-US", options)}`;
    }

    return `${diffDays} days ago`;
}
