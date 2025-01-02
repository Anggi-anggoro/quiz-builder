import Link from "next/link";

export default function Greeting(props : {email:string | undefined | null}) {
    return (
        <>
         <h1 className="text-6xl">Welcome!{props.email}</h1>
         <Link href={'sign-in'} className="border px-2 py-1 rounded-lg border-slate-400 shadow-lg mt-5">Get Started</Link>
        </>
    )
}