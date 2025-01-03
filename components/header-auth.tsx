import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import TranslateText from "./utils/translator";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in"><TranslateText comp="Header" text="sign-in"/></Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up"><TranslateText comp="Header" text="sign-up"/></Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="items-center gap-4 flex">
      <span className=" max-sm:hidden">
        <TranslateText comp="Header" text="hey"/>, {user.email}!
      </span>
      <form action={signOutAction}>
        <Button className="max-sm:text-xs max-sm:px-2 max-sm:py-1 max-sm:leading-none" type="submit" variant={"outline"}>
        <TranslateText comp="Header" text="sign-out"/>
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in"><TranslateText comp="Header" text="sign-in"/></Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up"><TranslateText comp="Header" text="sign-up"/></Link>
      </Button>
    </div>
  );
}
