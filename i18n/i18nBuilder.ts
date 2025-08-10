import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en-us.json";
import pt from "./languages/pt-br.json";

const deviceLanguage = getLocales()[0].languageCode;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en,
    pt,
  },
  lng: deviceLanguage ?? "en", // if you're using a language detector, do not define the lng option
  fallbackLng: "en",
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
