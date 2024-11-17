"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => setPages(data))
      .catch((error) => console.error("Error fetching pages:", error));
  }, []);

  return (
    <nav className="navbar div1">
      <div className="logo">
        <h1>
          PIERRE-JEAN
          <br /> TOGNI
        </h1>
        <p>INFOGRAPHISTE</p>
      </div>
      <ul className="nav-links">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
      <div className="cta">
        <a href="/cv.pdf" className="btn" download>
          Télécharger le CV
        </a>
      </div>
      <div className="logo_bkg"></div>
    </nav>
  );
}
