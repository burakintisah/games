import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getTranslation } from '../../lib/i18n';
import { languages } from '../../lib/i18n';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await getTranslation(locale);
  
  return {
    title: t('navigation.games') + ' - ' + t('gameModes.conversationCards'),
    description: t('gameModes.conversationCardsDesc'),
  };
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ locale: lang.code }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
} 