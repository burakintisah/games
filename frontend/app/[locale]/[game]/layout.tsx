import { GAME_MODES } from '../../../../shared/src';

export async function generateStaticParams() {
  return GAME_MODES.map((mode) => ({ game: mode.id }));
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
