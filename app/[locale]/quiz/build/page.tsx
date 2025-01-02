import QuizBuilder from "@/components/quiz/build-form";
import ListQuiz from "@/components/quiz/quiz-list";
import { quizProps } from "@/components/utils/interface";
import { createClient } from "@/utils/supabase/server";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

export default async function QuizPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const {data } = await supabase.from("Quiz").select().eq('email', user.email) 

  return (
    <>
    <div>
      {user.email &&  <QuizBuilder email={user.email}/>}     
    </div>
    </>
  );
}
