import Link from "next/link";

export default function error404() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back home
      </Link>
    </div>
  );
}