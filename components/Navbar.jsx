import Link from "next/link";

export default function Navbar({ user }) {
  return (
    <header className="border-b border-brand-light bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-brand-dark">
          TC-Immo
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/artisans" className="hover:text-brand">
            Trouver un artisan
          </Link>
          {user ? (
            <>
              <Link href="/messages" className="hover:text-brand">
                Messages
              </Link>
              <Link href="/appointments" className="hover:text-brand">
                Rendez-vous
              </Link>
              <Link href="/dashboard" className="hover:text-brand">
                Mon espace
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-brand">
                Connexion
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand-dark"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
