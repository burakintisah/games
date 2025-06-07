'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => 
    import(`../public/locales/${language}/${namespace}.json`)
  ))
  .init({
    lng: undefined, // detect from URL or default
    fallbackLng: 'en',
    supportedLngs: ['en', 'tr'],
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
  });

export function useClientTranslation(lng: string, ns: string = 'common') {
  const ret = useReactI18next(ns);
  const { i18n } = ret;
  
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  
  useEffect(() => {
    if (runsOnServerSide || activeLng === lng) return;
    
    setActiveLng(lng);
    i18n.changeLanguage(lng);
  }, [lng, i18n, activeLng]);
  
  useEffect(() => {
    if (runsOnServerSide || !lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
  
  return ret;
} 