import Link from "next/link";
import { auth } from "@/lib/edgedb";

export default async function Home() {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="absolute inset-x-0 top-0 z-50 shadow-md">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-4">
            {!signedIn ? (
              <>
                <Link
                  href={auth.getBuiltinUIUrl()}
                  prefetch={false}
                  className="text-sm font-semibold leading-6 text-gray-800"
                >
                  <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-primary">
                    Sign in
                  </button>
                </Link>
                <Link
                  href={auth.getBuiltinUISignUpUrl()}
                  prefetch={false}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <button className="bg-primary px-4 py-2 rounded-md text-white transition duration-300 ease-in-out hover:bg-primarydark hover:shadow-lg">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href={auth.getSignoutUrl()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-primary px-4 py-2 rounded-md text-white transition duration-300 ease-in-out hover:bg-primarydark hover:shadow-lg">
                  Sign out
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Our App
        </h1>
      </main>
    </div>
  );
}
