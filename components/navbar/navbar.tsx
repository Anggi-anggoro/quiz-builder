import Link from "next/link";
import ChangeLang from "./component/changeLang";

export default function Navbar({locale} : {locale : string}) {
    return(
        <header className="w-full flex justify-between py-4 px-12 bg-red-500">
            <Link href={`/${locale}/sign-in`}>
                Login
            </Link>
            <div>
                <ChangeLang locale={locale}/>
            </div>
        </header>
    )
}