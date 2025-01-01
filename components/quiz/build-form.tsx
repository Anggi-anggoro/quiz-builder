'use client'

import { createClient } from "@/utils/supabase/client";
import { useLocale, useTranslations } from "next-intl";
import React, { ChangeEvent, useEffect, useState } from "react";
import translateText from "../utils/translator";
import { quizProps } from "../utils/interface";

export default function QuizBuilder(props: {email: string | undefined }) {
  const [question, setQuestion] = useState<quizProps | undefined | null>();
  const [listQuiz, setListQuiz] = useState<quizProps[] | undefined>();
  

  const [options, setOptions] = useState([""]);
  const t = useTranslations("Quiz")
  const locale = useLocale()
  const otherLang = locale == 'ar' ? 'en' : 'ar';

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index: number, newValue: string) => {
    setOptions(
      options.map((opt, idx) => (idx === index ? newValue : opt))
    );
    saveQuestion(options.slice(0,options.length-1), `answer_option_${locale}`)

  };
  const saveMultiLangQuestion = (value: any) => {
    const translatedTitle = translateText(value[`title_${locale}`], locale, otherLang)
    console.log(translatedTitle)
    //     setQuestion((question : any) => ({
    //     ...question,
    //     // [`${prop}_${locale}`]: value,
    //     // [`${prop}_${otherLang}`]: value,
    //   }));
  };


  const saveQuestion = (value: string | number | string[], prop: string) => {

    setQuestion((question: any) => ({
      ...question,
      [prop]: value,
    }));
  };

  const saveQuiz = async (e: any) => {
    e.preventDefault()
    console.log(question)
    const supabase = createClient()
    if(!question?.id) {
      const { error } = await supabase.from('Quiz').insert({
        answer:question?.answer,
        title_ar: question?.title_ar,
        title_en: question?.title_en,
        answer_option_ar: question?.answer_option_ar,
        answer_option_en: question?.answer_option_en,
        question_ar: question?.question_ar,
        question_en: question?.question_en,
        email: props.email
      })
      console.log(error)
    } else {
      const {error} = await supabase.from('Quiz').update(question).eq('id', question?.id)
      console.log(error)
    }
    setQuestion({
      id: null,
      answer: null,
      title_ar: null,
      answer_option_ar: null,
      answer_option_en: null,
      question_ar: null,
      question_en: null,
      title_en: null,
      email: props.email
    })
    setOptions([""])
    getQuizList()
  };

  const getQuizList = async()=> {
    const supabase = await createClient()
    const { data } = await supabase.from("Quiz").select().eq('email', props.email) 
    const quiz = data as quizProps[]
    setListQuiz(quiz?.sort((a,b)=> a.id! - b.id!))
  }

  const saveAnswer = (value: number) => {
    saveQuestion(value, 'answer')
  }

  useEffect(() => {
    setQuestion((question: any) => ({
      ...question,
      ['email']: props.email,
    }));
    getQuizList()

  }, [])
  
  const handleEdit =(id:number) => {
    const quiz : quizProps | undefined = listQuiz?.find((item) => (
      item.id === id
    ))
    setQuestion(quiz)
    if(quiz?.answer_option_en) {
      setOptions([...quiz?.answer_option_en,""])
    }
    console.log(options)
  }

  const handleDelete = async(id:number) => {
    const supabase = await createClient()
    const { data } = await supabase.from("Quiz").delete().eq('id', id) 
    console.log(data)
    getQuizList()
  }

  return (
    <div className="flex">
      <div className="overflow-y-auto max-h-[80vh] p-8 mt-6 w-1/5">
        {listQuiz?.map((item : any, idx)=> (
          <div key={idx} className="p-4 border flex justify-between  border-black">
            <div>
            <h2 className="font-bold">
              {item[`title_${locale}`]}
            </h2>
            <div className="flex justify-between">
              <p>{item[`question_${locale}`]}</p>  
            </div>
            </div>
            <div className="flex flex-col ">
                  <button onClick={()=>handleDelete(item.id)} className="border border-black mb-2 p-1 rounded-md shadow-md text-[9px]">Delete</button>
                  <button onClick={()=>handleEdit(item.id)} className="border border-black p-1 rounded-md shadow-md text-[9px]">Edit</button>
               </div>
          </div>
        ))}
      </div>
      <div className="w-1/4 mx-auto">
        <form onSubmit={(e) => saveQuiz(e)}>
          <div className="flex justify-between mb-4 ">
            <label>{t('title')}</label>
            <input
              required
              type="text"
              placeholder={t('title')}
              value={locale == 'en' ? question?.title_en ?? "" : question?.title_ar ?? ""}
              onChange={(e) => saveQuestion(e.target.value, `title_${locale}`)}
              className="placeholder:text-sm text-center p  border border-1 py-1 rounded-md  text-black border-black"
            />
          </div>
          <div className="flex justify-between mb-4">
            <label>{t('question')}</label>
            <input
              required
              type="text"
              value={locale == 'en' ? question?.question_en ?? "" : question?.question_ar ?? ""}
              placeholder={t('question')}
              onChange={(e) => saveQuestion(e.target.value, `question_${locale}`)}
              className="placeholder:text-sm text-center px-3 border border-1 py-1 rounded-md  text-black border-black"
            />
          </div>
          <div className="flex justify-between">
            <label>{t('option')}</label>
            <div className="">
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2 justify-between">
                  <input
                    required={index < options.length-1}
                    type="text"
                    value={option}
                    placeholder={t('option')}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="placeholder:text-sm text-center py-1 border border-1 rounded-md  w-3/4  text-black border-black "
                  />

                  {index + 1 == options.length ?
                    <button onClick={addOption} className="rounded-md border border-black shadow-md px-2">
                      +
                    </button>
                    :
                    <input required checked={index == question?.answer} type="radio" className="" value={index} onChange={() => saveAnswer(index)} name="isAnswer" />
                  }
                </div>
              ))}

            </div>
          </div>
          <button type="submit" className="w-full mt-6 border border-black rounded-md p-2" >
            {t('save')}
          </button>
        </form>

      </div>
    </div>
  );
}
