"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
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
        <li>
          <Link href={`/a-propos`}>À propos</Link>
        </li>
        <li>
          <Link href={`/test`}>test</Link>
        </li>
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
