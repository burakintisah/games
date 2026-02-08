import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Games Platform - Conversation Cards',
  description: 'Deep, meaningful conversations with thought-provoking questions',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎮</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="font-sans">{children}</body>
    </html>
  );
}
