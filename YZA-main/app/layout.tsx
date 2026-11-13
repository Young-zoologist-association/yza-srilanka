import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollToTopOnLoad } from "@/components/shared/ScrollToTopOnLoad";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Home | YZA Sri Lanka",
  description:
    "Connects young zoologists in Sri Lanka to promote wildlife conservation, education, and research through events, resources, and community engagement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTopOnLoad />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
