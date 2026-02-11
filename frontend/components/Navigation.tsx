"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Gamepad2, Globe, ChevronDown, Shuffle } from 'lucide-react';
import { SUPPORTED_LANGUAGES, GAME_MODES } from '../../shared/src';
import type { GameMode } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface NavigationProps {
  onShuffleMode?: () => void;
  locale: string;
  activeGameMode: GameMode;
}

export function Navigation({ onShuffleMode, locale, activeGameMode }: NavigationProps) {
  const router = useRouter();
  const { t } = useClientTranslation(locale);
  const [selectedLanguage, setSelectedLanguage] = useState<typeof SUPPORTED_LANGUAGES[number]>(SUPPORTED_LANGUAGES[0]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGameModeOpen, setIsGameModeOpen] = useState(false);

  useEffect(() => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === locale);
    if (language) {
      setSelectedLanguage(language);
    }
  }, [locale]);

  const handleLanguageChange = (language: typeof SUPPORTED_LANGUAGES[number]) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
    const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${language.code}${currentPath}`);
  };

  const handleGameModeChange = (mode: typeof GAME_MODES[number]) => {
    setIsGameModeOpen(false);
    router.push(`/${locale}/${mode.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest('[data-dropdown-button]') || target.closest('[data-dropdown-content]')) {
        return;
      }
      setIsLanguageOpen(false);
      setIsGameModeOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
        setIsGameModeOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeMode = GAME_MODES.find(m => m.id === activeGameMode) || GAME_MODES[0];
  const showShuffle = activeGameMode === 'conversation-cards';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
    >
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-2 md:gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Gamepad2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">{t('navigation.games')}</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">{t('navigation.byAuthor')}</p>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                data-dropdown-button
                aria-expanded={isLanguageOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsGameModeOpen(false);
                }}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                <span className="text-xs md:text-sm font-medium text-gray-800">
                  <span className="md:hidden">{selectedLanguage.flag}</span>
                  <span className="hidden md:inline">{selectedLanguage.flag} {selectedLanguage.name}</span>
                </span>
                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-gray-700 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {isLanguageOpen && (
                <div
                  data-dropdown-content
                  role="listbox"
                  aria-label="Available languages"
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-32 md:min-w-48 animate-in fade-in-0 zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 transition-colors w-full text-left ${
                        selectedLanguage.code === language.code ? 'bg-violet-50 text-violet-700' : 'text-gray-800'
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span className="text-xs md:text-sm font-medium">{language.name}</span>
                      {selectedLanguage.code === language.code && (
                        <div className="ml-auto w-2 h-2 bg-violet-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Game Mode Selector */}
            <div className="relative">
              <motion.button
                data-dropdown-button
                aria-expanded={isGameModeOpen}
                aria-haspopup="listbox"
                aria-label="Select game mode"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsGameModeOpen(!isGameModeOpen);
                  setIsLanguageOpen(false);
                }}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-colors shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm hidden md:inline">{activeMode.icon}</span>
                <span className="text-xs md:text-sm font-medium truncate max-w-20 md:max-w-none">
                  {t(activeMode.nameKey)}
                </span>
                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isGameModeOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {isGameModeOpen && (
                <div
                  data-dropdown-content
                  role="listbox"
                  aria-label="Available game modes"
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-48 md:min-w-64 animate-in fade-in-0 zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {GAME_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleGameModeChange(mode)}
                      className={`flex items-start gap-3 px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 transition-colors w-full text-left ${
                        activeGameMode === mode.id ? 'bg-violet-50' : ''
                      }`}
                    >
                      <span className="text-lg mt-0.5">{mode.icon}</span>
                      <div className="flex flex-col">
                        <span className={`text-xs md:text-sm font-medium ${
                          activeGameMode === mode.id ? 'text-violet-700' : 'text-gray-900'
                        }`}>{t(mode.nameKey)}</span>
                        <span className="text-xs text-gray-500 hidden md:block">{t(mode.descKey)}</span>
                      </div>
                      {activeGameMode === mode.id && (
                        <div className="ml-auto mt-1 w-2 h-2 bg-violet-600 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Shuffle Button - Only for Conversation Cards, Desktop Only */}
            {showShuffle && onShuffleMode && (
              <motion.button
                onClick={onShuffleMode}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shuffle className="w-4 h-4" />
                <span>{t('navigation.shuffle')}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
