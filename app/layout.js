import "./globals.css";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "TC-Immo — Artisans vérifiés en Côte d'Ivoire",
  description:
    "Connectez-vous à des artisans vérifiés en Côte d'Ivoire, suivez vos chantiers en direct et payez en toute sécurité.",
};

export default async function RootLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="fr">
      <body>
        <Navbar user={user} />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
