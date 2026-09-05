"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// NOTE : ceci ne fait qu'avancer le statut en base. L'intégration réelle
// avec un prestataire de paiement (Stripe Connect, CinetPay...) doit se
// faire ici avant de changer le statut en production.
export async function advanceProjectStatus(formData) {
  const supabase = createClient();
  const projectId = formData.get("projectId");
  const newStatus = formData.get("newStatus");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  await supabase
    .from("projects")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", projectId);

  await supabase.from("escrow_events").insert({
    project_id: projectId,
    event_type: newStatus,
    metadata: { triggered_by: user.id },
  });

  redirect(`/projects/${projectId}`);
}
