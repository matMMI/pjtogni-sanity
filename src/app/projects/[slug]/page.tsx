// src/app/projects/[slug]/page.tsx
import { client } from "@/sanity/client";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProjectDetails {
  title: string;
  image: string;
  description: string;
  body: any[];
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await client.fetch<ProjectDetails>(
    `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      "image": image.asset->url,
      description,
      body
    }
  `,
    { slug: params.slug }
  );

  if (!project) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={600}
          className="rounded-lg mb-8"
        />
      )}
      <div className="prose max-w-none">
        <p className="text-xl mb-8">{project.description}</p>
        <PortableText value={project.body} />
      </div>
    </div>
  );
}
