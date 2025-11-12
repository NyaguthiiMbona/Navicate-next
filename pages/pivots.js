import fs from "fs";
import path from "path";
import Link from "next/link";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "jobOpportunities.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const jobData = JSON.parse(jsonData);
  const roles = Object.keys(jobData);

  return {
    props: { roles }
  };
}

export default function PivotsPage({ roles }) {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Explore Career Pivots</h1>
      <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
        Select your current role to see possible career transitions.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem"
        }}
      >
        {roles.map((role) => (
          <Link
            key={role}
            href={`/pivot/${role}`}
            style={{
              display: "block",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
              textDecoration: "none",
              color: "#333",
              fontWeight: "500"
            }}
          >
            {role
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
