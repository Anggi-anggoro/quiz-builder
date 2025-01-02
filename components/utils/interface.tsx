export interface quizProps {
    [key: string]: any;
    id : number | undefined,
    title_en: string | undefined | null,
    title_ar: string | undefined | null,
    question_en: string | undefined | null,
    question_ar: string | undefined | null,
    answer_option_en: string[] | undefined | null,
    answer_option_ar: string[] | undefined | null,
    answer: number | undefined | null,
    email : string | undefined
}

export interface quizList{
    [key: string]: any;
    id : number,
    title : string | undefined | null,
    question : string | undefined | null,
}

export interface answerProps{
    quest_id:number | undefined,
    question : string | undefined | null,
    answer:number | undefined | null,    
}

export interface submission {
    quest_title : string | undefined | null,
    answer : answerProps[],
    score : number,
    email : string | undefined
}