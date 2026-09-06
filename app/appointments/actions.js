"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/ensureProfile";

export async function signup(formData) {
  const supabase = createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");
  const role = formData.get("role"); // 'client' ou 'artisan'
  const trade = formData.get("trade"); // uniquement si artisan

  // On stocke nom/rôle/métier dans les métadonnées du compte : elles
  // survivent même si la confirmation d'email retarde la création du
  // profil en base de données.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        trade,
      },
    },
  });

  if (error) {
    return redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  const userId = data.user?.id;
  if (userId) {
    // Tentative immédiate (fonctionne si aucune confirmation d'email
    // n'est requise). Si ça échoue silencieusement, ensureProfile()
    // rattrapera ça à la connexion.
    await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      role,
    });

    if (role === "artisan") {
      await supabase.from("artisan_profiles").insert({
        id: userId,
        trade: trade || "Non spécifié",
      });
    }
  }

  redirect("/auth/confirm-email");
}

export async function login(formData) {
  const supabase = createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  // Rattrapage : si le profil n'existe pas encore (cas de la confirmation
  // d'email qui a retardé sa création), on le crée maintenant.
  await ensureProfile(supabase, data.user);

  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
