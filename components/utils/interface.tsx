export interface quizProps {
    [key: string]: any;
    id : number | undefined | null,
    title_en: string | undefined | null,
    title_ar: string | undefined | null,
    question_en: string | undefined | null,
    question_ar: string | undefined | null,
    answer_option_en: string[] | undefined | null,
    answer_option_ar: string[] | undefined | null,
    answer: number | undefined | null,
    email : string | undefined
}