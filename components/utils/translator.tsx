import { useTranslations } from "next-intl";

export default function TranslateText(props :{text : string, comp :string}) {
  const t = useTranslations(props.comp)
  return(
    <>
      {t(props.text)}
    </>
  )
  
}