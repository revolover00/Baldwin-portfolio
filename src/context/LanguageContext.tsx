import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language } from "./languageData";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.EN) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferred_language");
    if (saved === "AR" || saved === "EN") return saved;
    return "EN"; // English as default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const isRtl = language === "AR";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language.toLowerCase();
    
    // Smoothly apply Arabic font style
    if (isRtl) {
      document.body.style.fontFamily = "'Cairo', 'Plus Jakarta Sans', sans-serif";
      // Let's add Google Cairo font dynamically if not loaded
      if (!document.getElementById("google-cairo-font")) {
        const link = document.createElement("link");
        link.id = "google-cairo-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap";
        document.head.appendChild(link);
      }
    } else {
      document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    }
  }, [language, isRtl]);

  const t = (key: keyof typeof translations.EN): string => {
    const dict = translations[language];
    return dict[key] || translations.EN[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Context modules intentionally export a consumer hook alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
