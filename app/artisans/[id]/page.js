import { createClient } from "@/lib/supabase/server";
import ReviewList from "@/components/ReviewList";
import Link from "next/link";

export default async function ArtisanProfilePage({ params }) {
  const supabase = createClient();
  const { id } = params;

  const { data: artisan } = await supabase
    .from("artisan_profiles")
    .select(
      `id, trade, bio, years_experience, is_verified, hourly_rate, currency,
       profiles ( full_name, city, avatar_url )`
    )
    .eq("id", id)
    .single();

  const { data: photos } = await supabase
    .from("artisan_photos")
    .select("id, photo_url, caption")
    .eq("artisan_id", id);

  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, rating, comment, profiles ( full_name )")
    .eq("artisan_id", id)
    .order("created_at", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!artisan) {
    return <p>Artisan introuvable.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">
            {artisan.profiles?.full_name}
          </h1>
          <p className="text-brand">{artisan.trade}</p>
          <p className="text-sm text-gray-600">{artisan.profiles?.city}</p>
        </div>
        {user && (
          <div className="flex gap-2">
            <Link
              href={`/messages/new?artisan=${artisan.id}`}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Message
            </Link>
            <Link
              href={`/appointments/new?artisan=${artisan.id}`}
              className="rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand-light"
            >
              Prendre RDV / Appel vidéo
            </Link>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-700">{artisan.bio}</p>

      {photos && photos.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 font-semibold">Photos de chantiers</h2>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.id}
                src={p.photo_url}
                alt={p.caption || "Photo de chantier"}
                className="h-32 w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-semibold">Avis clients</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
