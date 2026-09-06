

export default function PageHeader({ cantidad }) {
  return (
    <div className="bg-amber-50/70 px-8 py-10">
      <p className="text-xs font-medium tracking-wide text-amber-700">
        Tienda online
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-neutral-900">
        Catálogo de Productos
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {cantidad} productos disponibles
      </p>
    </div>
  );
}
