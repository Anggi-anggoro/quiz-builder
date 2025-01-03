'use client'
import TranslateText from "@/components/utils/translator"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent } from "react"

export default function ChangeLang({ locale }: { locale: string }) {
    const pathName = usePathname()
    const router = useRouter()

    const handleChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as string
        const path = pathName.split("/").slice(2).join("/")
        router.push(`/${newLang}/${path}`)
        router.refresh()
    }

    return (
        <div className="max-sm:text-xs max-sm:flex flex-col">
            <label><TranslateText comp="Header" text="language" />:</label>
            <select value={locale} onChange={handleChangeLang}>
                <option className="" value="en">
                    <TranslateText comp="Header" text="english" />
                </option>
                <option value="ar">
                    <TranslateText comp="Header" text="arabic" />
                </option>
            </select>
        </div>
    )
}