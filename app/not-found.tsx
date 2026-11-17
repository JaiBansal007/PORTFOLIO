import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" aria-labelledby="not-found-heading">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="section-label">404</span>
        <h1
          className="section-title"
          id="not-found-heading"
          style={{ marginBottom: 20 }}
        >
          Page not found
        </h1>
        <p style={{ color: "var(--clr-text-dim)", marginBottom: 28 }}>
          The page you are looking for does not exist.
        </p>
        <Link className="btn btn-primary" href="/">
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}
