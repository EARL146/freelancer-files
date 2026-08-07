import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "PharmaCare - Your Trusted Online Pharmacy",
  description: "Order medicines, healthcare products, and wellness essentials with fast, secure, and reliable delivery. PharmaCare is your trusted online pharmacy.",
  keywords: "pharmacy, medicines, healthcare, online pharmacy, delivery, pharmacist consultation",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  authors: [{ name: "PharmaCare" }],
  openGraph: {
    title: "PharmaCare - Your Trusted Online Pharmacy",
    description: "Order medicines and healthcare products with fast delivery",
    url: "https://pharmacare.com",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "PharmaCare Pharmacy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PharmaCare - Your Trusted Online Pharmacy",
    description: "Order medicines and healthcare products with fast delivery",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%2310b981'>💊</text></svg>" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
