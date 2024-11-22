// components/ProjectDialog.tsx
"use client";
import Image from "next/image";

export default function ProjectDialog({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="float-right text-xl">
          ×
        </button>
        <div>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full"
          />
          <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
          <p className="mt-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
