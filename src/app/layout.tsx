import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TrackTr | Smarter Fleet Management',
  description:
    'TrackTr is the all-in-one fleet management solution designed to optimize vehicle performance, reduce downtime, and improve operational efficiency. From real-time tracking to predictive maintenance and driver behavior monitoring, TrackTr empowers your fleet with smarter tools and actionable insights.',
  keywords:
    'Fleet management, vehicle tracking, predictive maintenance, driver behavior monitoring, fleet efficiency, operational optimization, vehicle monitoring, GPS tracking, fleet analytics, maintenance scheduling, TrackTr',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
