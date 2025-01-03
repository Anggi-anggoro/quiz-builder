'use client'

import { createClient } from "@/utils/supabase/client";
import { useLocale, useTranslations } from "next-intl";
import React, { ChangeEvent, useEffect, useState } from "react";
import translateText from "../utils/translator";
import { quizList, quizProps } from "../utils/interface";



export default function QuizBuilder(props: { email: string | undefined }) {
  const initQUestion: quizProps = {
    id:undefined,
    answer: null,
    title_ar: null,
    answer_option_ar: [""],
    answer_option_en: [""],
    question_ar: null,
    question_en: null,
    title_en: null,
    email: props.email
  }

  const [listQuestion, setListQuestion] = useState<quizProps[]>([initQUestion]);
  const [listQuiz, setListQuiz] = useState<quizList[] | undefined>([])
  const [questTitle, setQuestTitle] = useState<string>('')
  const t = useTranslations("Quiz")
  const locale = useLocale()

  const addOption = (index: number) => {
    setListQuestion(
      listQuestion.map((opt: quizProps, idx) => (idx === index ? { ...opt, [`answer_option_${locale}`]: [...(opt.answer_option_en ?? []), ""] } : opt))
    )
  };

  const updateOption = (index: number, newValue: string, questionIdx: number) => {
    const newOption = listQuestion[questionIdx].answer_option_en?.map((opt,idx)=> ( idx == index ? newValue: opt ))
    setListQuestion(
      listQuestion.map((opt: quizProps, idx) => (idx === questionIdx ? { ...opt, [`answer_option_${locale}`]: newOption } : opt))
    )
  };
  const addQuestion = () => {
    setListQuestion([...listQuestion, initQUestion])
  };

  const saveQuestion = (value: string | number | string[], prop: string, index: number) => {
    setListQuestion(
      listQuestion.map((opt: quizProps, idx) => (idx === index ? { ...opt, [prop]: value } : opt))
    )
  };

  const saveQuiz = async (e: any) => {
    e.preventDefault()
    const supabase = createClient()
    listQuestion.map(async ({ id, ...opt }: quizProps) => {
      const result: Record<string, any> = {
        ...opt,
        [`title_${locale}`]: questTitle,
      };
      if (id != null) {
        result.id = id;
        const {error} = await supabase.from('Quiz').update(result).eq('id', id)
        console.log(error)
      } else {
        const {error} = await supabase.from('Quiz').insert(result)
        console.log(error)
      }
    })
    setListQuestion([initQUestion])
    getQuizList()  
  };

  const getQuizList = async () => {
    const supabase = await createClient()
    const { data } = await supabase.from("Quiz").select().eq('email', props.email).order(`title_${locale}`)
    
    const quiz = new Set (data?.map((item : quizList)=>({
      title : item[`title_${locale}`],
      id: item.id,
      question : item[`question_${locale}`]
    })) as quizList[] | undefined)
    setListQuiz(Array.from(quiz))
  }

  useEffect(() => {

    getQuizList()

  }, [])

  const handleEdit = async (title: string | undefined | null) => {
    const supabase = await createClient()
    const { data,error } = await supabase.from("Quiz").select().eq(`title_${locale}`, title).order('id')
    console.log(error)
    console.log(data)
    const questList = data as quizProps[]
    console.log(questList)
    setListQuestion(questList)
    setQuestTitle(questList[0][`title_${locale}`])  

  }

  const handleDelete = async (id: number) => {
    const supabase = await createClient()
    const { data,error } = await supabase.from("Quiz").delete().eq('id', id)
    console.log(error)
    console.log(data)
    getQuizList()
  }


  return (
    <div className="flex max-sm:flex-col-reverse justify-center items-center">
      <div className="flex flex-col justify-center border p-3 w-3/4 max-sm:px-5 max-sm:py-4 max-sm:mt-3 rounded sm:w-1/5">    
       <h2 className="text-center mb-2 font-bold">{t('question-list')}</h2>
        <div className="overflow-y-auto max-sm:flex sm:max-h-[80vh]">
            {listQuiz?.map((item: quizList, idx) => (
              <div key={idx} className="p-4 border rounded-sm mx-2 sm:mb-2 flex justify-between flex-col sm:items-center border-black">
                <div>
                  <h2 className="font-bold mb-2">
                    <span className="font-normal mr-1">{t('title')}:</span>{item.title}
                  </h2>
                  <p className="text-sm"><span className="mr-1">{t('question')}:</span>{item.question}</p>
                </div>
                <div className="flex flex-col self-end sm:pt-2">
                  <button onClick={() => handleDelete(item.id)} className="border border-black sm:mb-2 mb-4 p-1 rounded-md shadow-md text-[9px]">{t('delete')}</button>
                  <button onClick={() => handleEdit(item.title)} className="border border-black p-1 rounded-md shadow-md text-[9px]">{t('edit')}</button>
                </div>
              </div>
            ))}
          </div>
      </div>
      <div className="sm:w-3/5 max-sm:mx-7 mx-auto mt-6 ">
        <div className="mb-10 text-center">           
          <input
            required
            type="text"
            placeholder={t('title')}
            value={questTitle}
            onChange={(e) => setQuestTitle(e.target.value)}
            className="w-3/4 font-bold placeholder:text-sm text-center text-xl  border border-1 py-2 rounded-md  text-black border-black"
          />
        </div>
        <form  onSubmit={(e) => saveQuiz(e)}>
          <div className="overflow-auto max-h-[60vh] px-10 border border-slate-600 rounded-sm py-6">
        {listQuestion.map((item: quizProps, idx: number) => (
          <div key={idx} className="grid gap-x-4 grid-row-2 border-2 border-black p-5 rounded-md mb-7" >     
            <div className="flex justify-between gap-x-5 mb-4">
              <label>{t('question')}</label>
              <input
                required
                type="text"
                value={locale == 'en' ? item?.question_en ?? "" : item?.question_ar ?? ""}
                placeholder={t('question')}
                onChange={(e) => saveQuestion(e.target.value, `question_${locale}`, idx)}
                className="w-10/12 placeholder:text-sm text-center px-3 border border-1 py-1 rounded-md  text-black border-black"
              />
            </div>
            <div className="flex  gap-x-5 justify-between">
              <label>{t('option')}</label>
              <div className="w-10/12">
                {item[`answer_option_${locale}`]?.map((opt: string[], index: number) => (
                  <div key={index} className="flex items-center mb-2 justify-between">
                    <input
                      required={index < item[`answer_option_${locale}`]?.length - 1}
                      type="text"
                      value={opt}
                      placeholder={t('option')}
                      onChange={(e) => updateOption(index, e.target.value, idx)}
                      className="before:content-['ehheh'] placeholder:text-sm text-center py-1 border border-1 rounded-md  w-3/4  text-black border-black "
                    />

                    {index + 1  == item[`answer_option_${locale}`]?.length ?
                      <button type="button" onClick={() => addOption(idx)} className="rounded-md border border-black shadow-md px-2">
                        +
                      </button>
                      :
                      <div className="flex items-center">
                        <label className="mx-3 text-sm max-sm:text-xs">{t('answer')}</label>
                        <input required checked={index == item?.answer} type="radio" className="" value={index} onChange={() => saveQuestion(index, 'answer', idx)} name={`answer${idx}`} />
                      </div>
                    }
                  </div>
                ))}

              </div>
            </div>
            </div>
          ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
              <button className="border border-black rounded-md px-2 py-1" onClick={() => addQuestion()} type="button">{t('add-question')}</button>
              <button  type="submit" className="w-1/2  border text-white rounded-md p-2 bg-green-500 hover:bg-green-600  " >
                {t('save')}
              </button>
          </div>
          </form>

      </div>
    </div>
  );
}
