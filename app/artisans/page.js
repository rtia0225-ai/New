import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ArtisansPage() {
  const supabase = createClient();

  const { data: artisans } = await supabase
    .from("artisan_profiles")
    .select(
      `id, trade, bio, years_experience, is_verified, hourly_rate, currency,
       profiles ( full_name, city, avatar_url )`
    )
    .order("is_verified", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">
        Trouver un artisan
      </h1>

      {!artisans || artisans.length === 0 ? (
        <p className="text-gray-600">
          Aucun artisan pour le moment. Connecte Supabase et ajoute des
          profils pour les voir apparaître ici.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {artisans.map((a) => (
            <Link
              key={a.id}
              href={`/artisans/${a.id}`}
              className="rounded-xl border border-brand-light bg-white p-5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{a.profiles?.full_name}</h2>
                {a.is_verified && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand-dark">
                    Vérifié
                  </span>
                )}
              </div>
              <p className="text-sm text-brand">{a.trade}</p>
              <p className="mt-1 text-sm text-gray-600">{a.profiles?.city}</p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                {a.bio}
              </p>
              {a.hourly_rate && (
                <p className="mt-2 text-sm font-medium">
                  {a.hourly_rate} {a.currency} / heure
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
