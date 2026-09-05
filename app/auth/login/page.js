import { login } from "../actions";

export default function LoginPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">Connexion</h1>

      {searchParams?.error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {searchParams.error}
        </p>
      )}

      <form action={login} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-brand py-2 font-medium text-white hover:bg-brand-dark"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
