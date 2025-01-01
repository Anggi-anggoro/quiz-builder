'use client'
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent } from "react"

export default function ChangeLang({locale} : {locale :string}) {
    const pathName = usePathname()
    const router = useRouter()

    const handleChangeLang = (e : ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as string
        const path = pathName.split("/").slice(2).join("/")
        router.push(`/${newLang}/${path}`)
    }

    return (
        <select value={locale} onChange={handleChangeLang}>
            <option value="en">
                EN
            </option>
            <option value="ar">
                AR
            </option>
        </select>
    )
}