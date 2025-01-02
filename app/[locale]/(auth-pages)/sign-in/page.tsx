import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TranslateText from "@/components/utils/translator";
import Link from "next/link";
import React from "react";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64 border border-black p-12 rounded-sm">
      <h1 className="text-2xl font-medium"><TranslateText comp="Header" text="sign-in"/></h1>
      <p className="text-sm text-foreground">
      <TranslateText comp="Login" text="no-account"/>{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          <TranslateText comp="Header" text="sign-up"/>
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email"><TranslateText comp="Login" text="email"/></Label>
        <Input name="email" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password"><TranslateText comp="Login" text="password"/></Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            <TranslateText comp="Login" text="forgot"/>
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          required
        />
        <SubmitButton pendingText="signing-in" formAction={signInAction}>
        <TranslateText comp="Header" text="sign-in"/>
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
