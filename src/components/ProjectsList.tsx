// components/ProjectsList.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: string;
  displayMode: "page" | "popup";
  body: any[]; // Pour le contenu Portable Text
}

function Dialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="float-right text-xl">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover h-48 w-full"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600">{project.description}</p>
        {project.displayMode === "page" && project.body && (
          <div className="mt-4">
            <PortableText value={project.body} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    if (project.displayMode === "popup") {
      setSelectedProject(project);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project._id}
          onClick={() => handleProjectClick(project)}
          className="group cursor-pointer"
        >
          {project.displayMode === "page" ? (
            <Link href={`/projects/${project.slug}`}>
              <ProjectCard project={project} />
            </Link>
          ) : (
            <ProjectCard project={project} />
          )}
        </div>
      ))}

      <Dialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div>
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={1200}
              height={800}
              className="w-full"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedProject.title}</h2>
            <p className="mt-2">{selectedProject.description}</p>
            {selectedProject.body && (
              <div className="mt-4">
                <PortableText value={selectedProject.body} />
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
