import React, { createContext, ReactNode, useState } from 'react';
import { en } from '../lenguage/en';
import { es } from '../lenguage/es';

export enum LanguageCatalog {
  ES = 'es',
  EN = 'en'
}

export interface ILanguageContext {
  language: LanguageCatalog;
  switchLanguage: (lang: LanguageCatalog) => void;
  content: any;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: LanguageCatalog.ES,
  switchLanguage: () => {},
  content: {}
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(LanguageCatalog.ES);
  const [content, setContent] = useState<any>(es);

  const switchLanguage = (lang: LanguageCatalog) => {
    setLanguage(lang);

    if (lang === LanguageCatalog.ES) setContent(es);
    else setContent(en);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};
