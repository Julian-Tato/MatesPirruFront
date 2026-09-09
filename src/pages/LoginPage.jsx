import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al mandar el formulario
    setError("");
    setLoading(true);

    try {
      // Reemplazá la URL exacta por el endpoint de tu API de .NET
      const response = await fetch("https://localhost:7045/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas o error de conexión.");
      }

      const data = await response.json();
      console.log("¡Usuario conectado!", data);
      
      // Si sale bien, lo mandamos directo al catálogo/inicio
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const manejarGoogleLogin = async (credentialResponse) => {
  setError("");
  setLoading(true);

  try {
    const response = await fetch("https://localhost:7045/api/Usuarios/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: credentialResponse.credential }),
    });

    if (!response.ok) {
      throw new Error("No se pudo iniciar sesión con Google.");
    }

    const data = await response.json();
    console.log("¡Usuario conectado con Google!", data);

    navigate("/"); 
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
          Bienvenido de vuelta
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Ingresá a tu cuenta para continuar
        </p>
      </div>

      {/* Conectamos el formulario con la función manejarLogin */}
      <form onSubmit={manejarLogin} className="space-y-5">
        
        {/* Bloque de error para mostrar mensajes al usuario */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-900">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-900">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-emerald-800 text-base font-medium hover:bg-emerald-900 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>
      </form>

      {/* ... (el resto del código con el botón de Google y el link de registro queda igual) */}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500">O continuar con</span>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <GoogleLogin
          onSuccess={manejarGoogleLogin}
          onError={() => setError("La ventana de Google se cerró o falló.")}
          theme="outline"
          size="large"
          width="100%"
        />
      </div>

      <p className="mt-8 text-center text-sm text-neutral-500">
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="font-semibold text-emerald-800 hover:text-emerald-900">
          Registrate
        </Link>
      </p>
    </div>
  );
}