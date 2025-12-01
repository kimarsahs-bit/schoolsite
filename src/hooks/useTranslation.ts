import { useEffect, useState } from "react";
import { getTranslation, TranslationKey } from "@/lib/translations";

export const useTranslation = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Get initial language from localStorage
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  return { t, language };
};
