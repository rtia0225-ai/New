import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "../auth/actions";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const isArtisan = profile?.role === "artisan";

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status, amount, currency")
    .or(`client_id.eq.${user.id},artisan_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  // Messages non lus : reçus dans une conversation où je participe,
  // envoyés par l'autre, et pas encore marqués comme lus.
  const { data: myConversations } = await supabase
    .from("conversations")
    .select("id")
    .or(`client_id.eq.${user.id},artisan_id.eq.${user.id}`);

  const conversationIds = (myConversations || []).map((c) => c.id);

  let unreadCount = 0;
  if (conversationIds.length > 0) {
    const { count } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .in("conversation_id", conversationIds)
      .neq("sender_id", user.id)
      .is("read_at", null);
    unreadCount = count || 0;
  }

  // Prochains rendez-vous à venir
  const { data: upcomingAppointments } = await supabase
    .from("appointments")
    .select("id")
    .or(`client_id.eq.${user.id},artisan_id.eq.${user.id}`)
    .in("status", ["proposed", "confirmed"])
    .gte("scheduled_at", new Date().toISOString());

  const upcomingCount = upcomingAppointments?.length || 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">
            Bonjour, {profile?.full_name}
          </h1>
          <p className="text-sm text-gray-500">
            Compte {isArtisan ? "artisan" : "client"}
          </p>
        </div>
        <form action={logout}>
          <button className="text-sm text-gray-500 hover:text-brand">
            Déconnexion
          </button>
        </form>
      </div>

      {/* Raccourcis : nouveaux messages / nouveaux rendez-vous */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/messages"
          className="flex items-center justify-between rounded-xl border border-brand-light bg-white p-4 hover:shadow-sm"
        >
          <span className="font-medium">Nouveaux messages</span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        <Link
          href="/appointments"
          className="flex items-center justify-between rounded-xl border border-brand-light bg-white p-4 hover:shadow-sm"
        >
          <span className="font-medium">Nouveaux rendez-vous</span>
          {upcomingCount > 0 && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
              {upcomingCount}
            </span>
          )}
        </Link>
      </div>

      {isArtisan && (
        <Link
          href="/revenus"
          className="mb-6 block rounded-xl border border-brand-light bg-white p-4 hover:shadow-sm"
        >
          <span className="font-medium">Mes revenus</span>
          <p className="text-sm text-gray-500">
            Voir les paiements perçus et en attente
          </p>
        </Link>
      )}

      <h2 className="mb-3 font-semibold">
        {isArtisan ? "Projets en cours" : "Mes projets"}
      </h2>
      {!projects || projects.length === 0 ? (
        <p className="text-gray-600">Aucun projet pour le moment.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="flex items-center justify-between rounded-lg border border-brand-light bg-white p-4 hover:shadow-sm"
            >
              <span>{p.title}</span>
              <span className="text-sm text-gray-500">{p.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
