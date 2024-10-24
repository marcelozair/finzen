import { LanguageCatalog } from "../context/LanguageContext";

export const parseDate = (dateString: string, lang: LanguageCatalog = LanguageCatalog.ES): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
  };

  return new Intl.DateTimeFormat(lang, options).format(date);
}