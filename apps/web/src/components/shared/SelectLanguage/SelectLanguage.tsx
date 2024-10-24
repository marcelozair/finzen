import {Select, SelectItem, Avatar} from "@nextui-org/react";
import { useLanguage } from "../../../hooks/useLanguage";
import { LanguageCatalog } from "../../../context/LanguageContext";

export const SelectLanguage = () => {
  const { content, switchLanguage } = useLanguage('language');

  return (
    <Select
      className="max-w-xs absolute top-2 left-2"
      label={content.label}
      onChange={({ target: { value } }) => switchLanguage(value as LanguageCatalog)}
    >
      <SelectItem
        key="en"
        startContent={<Avatar alt="EEUU" className="w-6 h-6" src="https://flagcdn.com/us.svg" />}
      >
        {content.english}
      </SelectItem>
      <SelectItem
        key="es"
        startContent={<Avatar alt="PE" className="w-6 h-6" src="https://flagcdn.com/pe.svg" />}
      >
        {content.spanish}
      </SelectItem>
    </Select>
  );
}
