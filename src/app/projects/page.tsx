// src/app/projects/page.tsx
import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import ProjectsList from "@/components/ProjectsList";

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "image": image.asset->url,
  displayMode,
  body,
  category->{
    _id,
    title,
    "slug": slug.current
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function ProjectsPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, options);

  return (
    <main className="parent-container min-h-screen">
      <Navbar />
      <div className="div2-container flex-1 overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Projets</h1>
          <ProjectsList projects={projects} />
        </div>
      </div>
    </main>
  );
}
