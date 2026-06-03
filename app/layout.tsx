import type { Metadata } from "next";
import { Alfa_Slab_One, Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteSettings } from "@/lib/sanity/queries";
import "./globals.css";

const alfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saba Burgers — Brasa, queso y nada más.",
  description:
    "Smashburgers a la plancha, hechas con tiempo. Valencia, desde 2022. Pide online o reserva tu mesa.",
  metadataBase: new URL("https://sababurgers.es"),
  openGraph: {
    title: "Saba Burgers",
    description: "Smashburgers a la plancha, hechas con tiempo. Valencia.",
    type: "website",
    locale: "es_ES",
  },
  icons: {
    icon: "/logo-saba.jpg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="es"
      className={`${alfa.variable} ${bricolage.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="bg-paper text-carbon-800 min-h-screen flex flex-col">
        <SiteShell horarios={settings.horarios}>{children}</SiteShell>
      </body>
    </html>
  );
}
