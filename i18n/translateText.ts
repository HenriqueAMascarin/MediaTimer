import { useTranslation } from "react-i18next";

export function translateText(text: string) {
  const { t } = useTranslation();

  const newText = t(text);

  return newText;
}
