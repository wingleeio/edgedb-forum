import Link from "next/link";

export default function VerifyEmail() {
    return (
        <div className="relative bg-muted rounded-md shadow-lg border border-solid w-[380px] max-w-full">
            <div className="rounded-md p-8 flex flex-col items-center bg-background border-b border-solid">
                <Link href="/">
                    <img className="h-8 mb-8" src="/logo.svg" alt="my logo" />
                </Link>
                <h1 className="font-semibold mb-2">Check your email</h1>
                <p className="text-muted-foreground text-sm text-center">
                    We've sent you a link to verify your email! Check your email
                    to continue.
                </p>
            </div>
            <div className="p-4 text-center text-sm">
                <span className="text-muted-foreground/80">
                    Not getting an email?{" "}
                </span>
                <Link href="/auth/login">Try again</Link>
            </div>
        </div>
    );
}
