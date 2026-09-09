import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function RegistroPage() {
  const [nombreApellido, setNombreApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://localhost:7045/api/Usuarios/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          nombreApellido, 
          email, 
          password, 
          telefono, 
          direccion 
        }),
      });

      if (!response.ok) {
        throw new Error("Ocurrió un error al crear la cuenta. Intentá con otro email.");
      }

      console.log("¡Usuario registrado con éxito!");
      // Si el registro es exitoso, lo mandamos al login para que ingrese
      navigate("/login"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-[420px] rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <span className="mb-4 block text-4xl" role="img" aria-label="Mate">🧉</span>
        <h2 className="text-[28px] font-bold tracking-tight text-neutral-900">
          Creá tu cuenta
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Unite a la comunidad de Mates Pirru
        </p>
      </div>

      <form onSubmit={manejarRegistro} className="space-y-4">
        
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombreApellido}
            onChange={(e) => setNombreApellido(e.target.value)}
            required
            placeholder="Juan Pérez"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Teléfono
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            placeholder="11 1234 5678"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Dirección
          </label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            placeholder="Av. Corrientes 1234, CABA"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-emerald-800 text-base font-medium hover:bg-emerald-900 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </div>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500">O registrate con</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-xl border border-neutral-200 bg-white text-base font-medium text-neutral-900 hover:bg-neutral-50"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Conectar con Google
      </Button>

      <p className="mt-8 text-center text-sm text-neutral-500">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-semibold text-emerald-800 hover:text-emerald-900">
          Ingresá
        </Link>
      </p>
    </div>
  );
}