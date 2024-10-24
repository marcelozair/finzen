import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export const useLanguage = (page?: string) => {
  const languageConfig = useContext(LanguageContext);

  return {
    content: page ? languageConfig.content[page] : {},
    language: languageConfig.language,
    switchLanguage: languageConfig.switchLanguage
  };
}