"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { client } from "@/sanity/client";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const pathname = usePathname();

  const navLinks = [
    { href: "/a-propos", label: "À propos" },
    { href: "/projects", label: "Tous mes projets" },
  ];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await client.fetch(`{
          "result": *[_type == "resume" && active == true][0] {
            _type,
            title,
            active,
            pdfFile {
              asset {
                _ref
              }
            }
          }
        }`);

        if (response?.result?.pdfFile?.asset?._ref) {
          // Extraire l'ID du fichier du _ref
          const fileId = response.result.pdfFile.asset._ref
            .replace("file-", "")
            .replace("-pdf", "");

          // Construire l'URL du fichier
          const fileUrl = `https://cdn.sanity.io/files/6647uzn8/production/${fileId}.pdf`;
          setResumeUrl(fileUrl);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du CV:", error);
      }
    };

    fetchResume();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="z-[11] lg:hidden fixed top-4 right-4 p-2 bg-black text-white rounded-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        className={`fixed z-10 lg:relative flex-none w-[350px] h-screen bg-black text-white flex flex-col justify-between p-16 overflow-hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="relative z-10">
          <div className="text-center mb-20">
            <h1 className="text-2xl font-bold whitespace-nowrap">
              PIERRE-JEAN
              <br /> TOGNI
            </h1>
            <p className="text-sm uppercase mt-2 opacity-80">Infographiste</p>
          </div>

          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg transition-all duration-200 hover:text-gray-300 relative group ${
                    pathname === link.href ? "text-white" : "text-gray-400"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${
                        pathname === link.href ? "w-full" : "w-0"
                      }`}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {resumeUrl && (
          <div className="relative z-10">
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-white text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg transform hover:-translate-y-1"
            >
              Télécharger le CV
            </a>
          </div>
        )}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[540px] h-[510px] bg-[url('/logo.svg')] bg-no-repeat bg-center bg-contain opacity-60" />
      </nav>
    </>
  );
};

export default Navbar;
