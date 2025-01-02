import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import TranslateText from "@/components/utils/translator";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64  mx-auto  border border-black p-12 rounded-sm">
        <h1 className="text-2xl font-medium"><TranslateText comp="Header" text="sign-up"/></h1>
        <p className="text-sm text text-foreground">
        <TranslateText comp="Login" text="already-account"/>{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
          <TranslateText comp="Header" text="sign-in"/>
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email"><TranslateText comp="Login" text="email"/></Label>
          <Input name="email" required />
          <Label htmlFor="password"><TranslateText comp="Login" text="password"/></Label>
          <Input
            type="password"
            name="password" 
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          <TranslateText comp="Header" text="sign-up"/>
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
