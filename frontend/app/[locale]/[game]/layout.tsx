import { GAME_MODES, SUPPORTED_LANGUAGES } from '../../../../shared/src';

export async function generateStaticParams() {
  const params: { locale: string; game: string }[] = [];
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const mode of GAME_MODES) {
      if ((mode.locales as readonly string[]).includes(lang.code)) {
        params.push({ locale: lang.code, game: mode.id });
      }
    }
  }
  return params;
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
