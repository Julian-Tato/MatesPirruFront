import React from 'react';
import { Button } from '@/components/ui/button'; 
import heroImage from '../assets/hero.png';
import Navbar from "../components/layout/Navbar";
import BannerPrincipal from '../components/inicio/BannerPrincipal';
import MatesDestacados from '../components/inicio/MatesDestacados';
import BannerInspiracion from '../components/inicio/BannerInspiracion';
import Footer from '../components/layout/Footer';

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-start">
      <Navbar />
      <main>
        <BannerPrincipal />
        <MatesDestacados />
        <BannerInspiracion />
      </main>

    <Footer />

    </div>
  );
}