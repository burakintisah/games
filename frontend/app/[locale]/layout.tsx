import type { Metadata } from 'next';
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

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <>{children}</>;
} 