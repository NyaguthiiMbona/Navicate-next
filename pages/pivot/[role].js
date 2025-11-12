import fs from "fs";
import path from "path";
import Link from "next/link";

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "jobOpportunities.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const jobData = JSON.parse(jsonData);
  const roles = Object.keys(jobData);

  const paths = roles.map((role) => ({
    params: { role }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "jobOpportunities.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const jobData = JSON.parse(jsonData);
  const opportunities = jobData[params.role] || [];

  return {
    props: { role: params.role, opportunities }
  };
}

export default function PivotPage({ role, opportunities }) {
  const formattedRole = role
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Career Pivots for {formattedRole}
      </h1>
      <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
        Discover possible transitions for {formattedRole} professionals.
      </p>

      {opportunities.length === 0 ? (
        <p>No data available yet for this role.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {opportunities.map((job, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fafafa"
              }}
            >
              <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{job.title}</h2>
              <p style={{ margin: "0.5rem 0" }}>{job.description}</p>
              <p><strong>Skills:</strong> {job.transferableSkills.join(", ")}</p>
              <p><strong>Salary:</strong> {job.salaryRange}</p>
              <p><strong>Growth:</strong> {job.growthPotential}</p>
              <p><strong>Location:</strong> {job.location}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/pivots" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to All Pivots
        </Link>
      </div>
    </main>
  );
}
