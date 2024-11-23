// components/ProjectDialog.tsx
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  displayMode: "page" | "popup";
  body?: any[];
  category?: {
    _id: string;
    title: string;
    slug: string;
  };
}

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDialog({
  isOpen,
  onClose,
  project,
}: ProjectDialogProps) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
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
          <div className="space-y-6">
            {project.image && (
              <div className="relative h-[50vh] rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none">
              {project.category && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full mb-3">
                  {project.category.title}
                </span>
              )}
              <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              {project.body && (
                <div className="mt-6">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
