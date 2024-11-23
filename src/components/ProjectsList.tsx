// components/ProjectsList.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion"; // Ajout de AnimatePresence

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  displayMode: "page" | "popup";
  body: any[];
  order: number;
  category: {
    _id: string;
    title: string;
    slug: string;
  };
}

function ProjectCardSkeleton() {
  return (
    <div className="relative bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-md">
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "wave 1.5s linear infinite",
        }}
      />

      <div className="relative">
        <div className="h-60 bg-[#2C2C2C]" />
        <div className="p-6 space-y-4">
          <div className="h-8 bg-[#2C2C2C] rounded-full w-1/3" />{" "}
          <div className="h-6 bg-[#2C2C2C] rounded-md w-3/4" />
          <div className="space-y-3">
            <div className="h-4 bg-[#2C2C2C] rounded-md w-full" />
            <div className="h-4 bg-[#2C2C2C] rounded-md w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
const getBadgeStyle = (category: { title: string; slug: string }) => {
  if (!category) return defaultStyle;

  const styles = {
    "web-development":
      "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    "mobile-dev":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    design:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    frontend:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    backend:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    litterature:
      "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  };

  return (
    styles[category.slug] ||
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  );
};
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {project.image && (
        <div className="relative h-60 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <span
          className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${getBadgeStyle(
            project.category
          )}`}
        >
          {project.category?.title || "Non catégorisé"}
        </span>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          {project.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

function Dialog({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute z-10 top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortedProjects = [...projects].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Récupération des catégories uniques
  const categories = Array.from(
    new Set(
      projects
        .filter((project) => project.category)
        .map((project) => ({
          title: project.category.title,
          slug: project.category.slug,
        }))
    )
  ).sort((a, b) => a.title.localeCompare(b.title));
  const filteredProjects = selectedCategory
    ? sortedProjects.filter(
        (project) => project.category?.title === selectedCategory
      )
    : sortedProjects;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === null
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.title)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.title
                  ? getBadgeStyle(category)
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, i) => <ProjectCardSkeleton key={i} />)
          : filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                className="group cursor-pointer"
                onClick={() =>
                  project.displayMode === "popup" && setSelectedProject(project)
                }
              >
                {project.displayMode === "page" ? (
                  <Link href={`/projects/${project.slug}`}>
                    <ProjectCard project={project} />
                  </Link>
                ) : (
                  <ProjectCard project={project} />
                )}
              </motion.div>
            ))}
      </div>

      <Dialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <div className="relative h-[50vh] rounded-xl overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full mb-3">
                {selectedProject.category?.title || "Non catégorisé"}
              </span>
              <h2 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {selectedProject.description}
              </p>
              {selectedProject.body && (
                <div className="mt-6">
                  <PortableText value={selectedProject.body} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </Dialog>
    </div>
  );
}
