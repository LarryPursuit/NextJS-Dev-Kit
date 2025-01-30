import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
