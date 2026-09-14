export default function PageHeader({ cantidad }) {
  return (
    <div className="relative pt-24 pb-32 px-6 z-10 bg-[#0f1711] rounded-b-[3rem] shadow-xl overflow-hidden">
      
      {/* Brillos abstractos estilo Dark Mode que se funden con el fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] bg-emerald-700 mix-blend-screen pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] bg-[#d4af37] mix-blend-screen pointer-events-none" />

      {/* Contenedor centralizado con los textos */}
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center relative z-10">
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
          Colección Mates Pirru
        </span>
        <h1 className="mb-4 text-5xl font-semibold leading-tight text-white md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
          Catálogo de Productos
        </h1>
        <p className="max-w-2xl text-lg font-light text-emerald-200/80">
          Explorá nuestra selección de {cantidad} piezas únicas, donde la tradición del buen mate se encuentra con el diseño contemporáneo.
        </p>
      </div>
    </div>
  );
}