'use client'
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { answerProps, quizList, quizProps } from "../utils/interface";
import { useLocale } from "next-intl";
import TranslateText from "../utils/translator";


export default function ListQuiz(props: { email: string | undefined }) {
    const supabase = createClient()
    const initAnswer: answerProps = {
        quest_id: undefined,
        answer: -1,
        question: undefined,
    }

    const [listQuiz, setListQuiz] = useState<string[] | undefined>([])
    const [listQuestion, setListQuestion] = useState<quizProps[]>([])
    const [listAnswer, setListAnswer] = useState<answerProps[]>([initAnswer])
    const [viewAnswer, setViewAnswer] = useState<boolean>(false)
    const [title, setTitle] = useState<string>()
    const [score, setScore] = useState<number>(0)
    const locale = useLocale()

    const getQuizList = async () => {
        const { data } = await supabase.from("Quiz").select(`title_${locale}`).order(`title_${locale}`)
        const quiz = new Set(data?.map((item: any) => item[`title_${locale}`]) as string[] | undefined)
        setListQuiz(Array.from(quiz))
     

    }
    useEffect(() => {
        getQuizList()
    }, [])

    useEffect(()=> {
        setScore(0)
        setViewAnswer(false)
    },[listQuestion])

    const getQuestionList = async (title: string) => {
        const supabase = createClient()
        const { data, error } = await supabase.from("Quiz").select().eq(`title_${locale}`, title).order('id')
        const questList = data as quizProps[]
        setTitle(questList[0][`title_${locale}`])
        setListQuestion(questList)
        setListAnswer(questList.map((quest: quizProps) => (
            {
                quest_id: quest.id,
                question: quest[`question_${locale}`],
                answer: null
            }
        )))
    }

    const handleAnswer = (id: number | undefined, value: number) => {
        setListAnswer(
            listAnswer.map((ans: answerProps) => (ans.quest_id === id ? { ...ans, answer: value } : ans))
        )
    }

    const handleSubmitQuiz = async () => {
        let newScore = 0
        listAnswer.map((quest: answerProps) => (
            listQuestion.find(i => i.id === quest.quest_id)?.answer == quest.answer && newScore++

        ))
        setScore(newScore)
        const { error } = await supabase.from('Submission').insert({
            quest_title: title,
            answer: listAnswer,
            score: newScore,
            email: props.email
        })
        console.log(error)
        setViewAnswer(true)
    }

    return (
        <div className="flex max-sm:flex-col-reverse justify-center items-center">
            <div className="flex justify-center  border p-3 w-3/4 max-sm:px-5 max-sm:py-4 rounded sm:w-1/5">    
                <div className="overflow-y-auto max-sm:flex sm:max-h-[80vh]">
                    {listQuiz?.map((item: string, idx) => (
                        <div key={idx} className="p-4 border rounded-sm mx-2 sm:mb-2 flex justify-between flex-col items-center border-black">                                
                                <p className="font-bold text-sm mb-3">
                                    {item}
                                </p>                                
                            <div className="flex flex-col sm:text-sm ">
                                <button className="text-xs border p-1 px-2 rounded-md max-sm:px-9" onClick={() => getQuestionList(item)}><TranslateText comp="Quiz" text="take-quiz"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="m-9  pl-6 w-3/4 min-h-[50vh]">
            {listQuestion.length > 0 &&
            <>
                    <h1 className="text-xl mb-7 font-bold text-center">{title}</h1>
                    <div className="border-2 shadow-md border-gray-500 rounded-md pr-10 h-3/4 overflow-auto">                       
                        {listQuestion.map((quest: quizProps, idx: number) => (
                            <div className="flex py-8 px-3 text-lg" key={idx}>                            
                                <div className="ml-3 ">
                                    <div className="mb-3">
                                    <span className="mr-2 font-bold">{idx + 1}.</span>
                                        {quest[`question_${locale}`]}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 ml-3">
                                        {quest[`answer_option_${locale}`]?.map((option: string, optIndex: number) => (
                                            <div className="flex" key={optIndex}>
                                                {option.length > 0 &&
                                                    <div className={`${optIndex == quest.answer && viewAnswer ? 'bg-green-500' :''} p-1 px-2 rounded-md`}>
                                                        <input onChange={() => handleAnswer(quest.id, optIndex)} value={optIndex} id={`answer${idx}_${optIndex}`} type="radio" name={`answer${idx}`} />
                                                        <label className="ml-2" htmlFor={`answer${idx}_${optIndex}`} >
                                                            {option}
                                                        </label>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>             
                    <div className="text-right mt-4">
                        {viewAnswer && 
                            <p>Your score {score}</p>  
                        }

                        <button className="border border-black shadow-md bg-white rounded-sm py-1 px-3" onClick={() => handleSubmitQuiz()}><TranslateText comp="Quiz" text="submit"/></button>                           
                    </div>
                    </>
            }
                </div>                
             
        </div>
    )
}