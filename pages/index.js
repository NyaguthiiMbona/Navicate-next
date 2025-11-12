import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome to NaviCate Next</h1>
      <p style={{ marginTop: "1rem", maxWidth: 500 }}>
        Discover career pivots and explore new opportunities based on your current skills.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/pivots" style={{ color: "blue", textDecoration: "underline" }}>
          Explore Career Pivots →
        </Link>
      </div>
    </main>
  );
}
