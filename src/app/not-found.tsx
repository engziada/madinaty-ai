import Link from "next/link";

/**
 * Handles unknown routes.
 */
export default function NotFound() {
  return (
    <main className="container section">
      <p className="overline">404</p>
      <h1>Page Not Found</h1>
      <p>The route you requested does not exist.</p>
      <Link className="btn btn-primary" href="/">
        Back to Home
      </Link>
    </main>
  );
}
