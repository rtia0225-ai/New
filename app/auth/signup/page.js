import { signup } from "../actions";

export default function SignupPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">
        Créer un compte
      </h1>

      {searchParams?.error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {searchParams.error}
        </p>
      )}

      <form action={signup} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Je suis...
          </label>
          <select
            name="role"
            required
            className="w-full rounded-lg border border-gray-300 p-2"
          >
            <option value="client">Client (diaspora / particulier)</option>
            <option value="artisan">Artisan</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nom complet</label>
          <input
            name="fullName"
            required
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Métier (si artisan)
          </label>
          <input
            name="trade"
            placeholder="ex: Plombier, Maçon, Électricien"
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

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
            minLength={6}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-brand py-2 font-medium text-white hover:bg-brand-dark"
        >
          Créer mon compte
        </button>
      </form>
    </div>
  );
}
