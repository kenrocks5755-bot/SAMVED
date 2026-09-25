import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAMVED | Personnel wellbeing',
  description: 'SAMVED intranet wellbeing dashboard. All personnel and signals in this demonstration are fictional.',
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body>{children}</body></html>;
}
