import i18next, { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const initI18next = async (lng: string, ns: string) => {
  // Create a new instance for server-side use
  const i18nInstance = createInstance();
  
  await i18nInstance
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`../public/locales/${language}/${namespace}.json`)
    ))
    .init({
      lng,
      fallbackLng: 'en',
      supportedLngs: ['en', 'tr'],
      defaultNS: ns,
      fallbackNS: ns,
      ns,
      interpolation: {
        escapeValue: false,
      },
    });
    
  return i18nInstance;
};

export async function getTranslation(lng: string, ns: string = 'common') {
  const i18nInstance = await initI18next(lng, ns);
  return {
    t: i18nInstance.getFixedT(lng, ns),
    i18n: i18nInstance,
  };
}

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export const defaultLanguage = 'en'; 