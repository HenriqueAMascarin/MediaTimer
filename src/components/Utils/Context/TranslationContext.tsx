import i18next from "i18next";
import React, {
  createContext,
  ReactElement,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";

const TranslationContext = createContext({ translateText: i18next.t });

type items = {
  children?: ReactElement | ReactElement[];
};

export default function TranslationProvider({ children }: items) {
  const { t: translateText } = useTranslation();

  return (
    <TranslationContext.Provider value={{ translateText }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTextTranslation() {
  const context = useContext(TranslationContext);
  const { translateText } = context;

  return { translateText };
}
