import type { Metadata } from 'next';
import '../globals.css';
import { getTranslation } from '../../lib/i18n';
import { languages } from '../../lib/i18n';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
