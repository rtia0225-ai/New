import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <h1 className="max-w-2xl text-4xl font-bold text-brand-dark">
        Rénovez et construisez en Côte d'Ivoire, où que vous soyez.
      </h1>
      <p className="max-w-xl text-lg text-gray-600">
        TC-Immo connecte la diaspora à des artisans vérifiés. Suivez votre
        chantier en direct, échangez avec l'artisan, et ne libérez le paiement
        que lorsque le travail est fait.
      </p>
      <div className="flex gap-4">
        <Link
          href="/artisans"
          className="rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
        >
          Trouver un artisan
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-lg border border-brand px-6 py-3 font-medium text-brand hover:bg-brand-light"
        >
          Je suis artisan
        </Link>
      </div>

      <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
        <FeatureCard
          title="Artisans vérifiés"
          text="Chaque profil est vérifié : avis clients, expérience, photos de chantiers réalisés."
        />
        <FeatureCard
          title="Paiement séquestré"
          text="Votre argent est bloqué en sécurité et n'est libéré à l'artisan qu'après validation du travail."
        />
        <FeatureCard
          title="Suivi en direct"
          text="Consultez l'avancement du chantier grâce à un flux caméra, où que vous soyez."
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-xl border border-brand-light bg-white p-6">
      <h3 className="mb-2 font-semibold text-brand-dark">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
