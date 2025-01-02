import Hero from "@/components/hero";
import Greeting from "@/components/homepage/greeting";
import Navbar from "@/components/navbar/navbar";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import TranslateText from "@/components/utils/translator";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useTransition } from "react";

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex justify-center flex-col items-center absolute right-0 top-0 bottom-0 left-0 -z-10">
      <h1 className="text-6xl"><TranslateText comp="Homepage" text="welcome"/>!</h1>
      <p><TranslateText comp="Homepage" text="get-started"/></p>
      <div className="flex gap-4">
        <Link href={'quiz'} className="border px-2 py-1 rounded-lg border-slate-400 shadow-lg mt-5">
          <TranslateText comp="Homepage" text="take-quiz" />
        </Link>
        <Link href={'quiz/build'} className="border px-2 py-1 rounded-lg border-slate-400 shadow-lg mt-5">
          <TranslateText comp="Homepage" text="build-quiz" />
        </Link>
      </div>
    </div>

  );
}
