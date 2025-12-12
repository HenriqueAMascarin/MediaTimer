import i18next from "i18next";
import React, {
  createContext,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";

const TranslationContext = createContext({ translateText: i18next.t });

type items = {
  children?: ReactElement | ReactElement[];
};

export default function TranslationProvider({ children }: items) {
  const { t: translateText } = useTranslation();

  const translateObject = useMemo(() => {
    return {
      translateText,
    };
  }, [translateText]);

  return (
    <TranslationContext.Provider value={translateObject}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTextTranslation() {
  const context = useContext(TranslationContext);
  const { translateText } = context;

  return { translateText };
}
