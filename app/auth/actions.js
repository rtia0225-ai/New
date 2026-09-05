"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const supabase = createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");
  const role = formData.get("role"); // 'client' ou 'artisan'
  const trade = formData.get("trade"); // uniquement si artisan

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  const userId = data.user?.id;
  if (userId) {
    // Création du profil de base
    await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      role,
    });

    // Si artisan, on crée aussi la fiche métier
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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
