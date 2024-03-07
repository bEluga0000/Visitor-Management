import React from "react";

interface InputProps {
    placeholder?: string
    value?: string
    type?: string
    disabled?: boolean
    secondry?:boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    width?:string
}
export const Input = ({
    placeholder,
    value,
    type,
    disabled,
    onChange,
    secondry,
    width

}: InputProps) => {
    const sanitizedValue = value || '';
    return <input
        disabled={disabled}
        onChange={onChange}
        value={sanitizedValue}
        placeholder={placeholder}
        type={type}
        className={`
    p-2
    text-lg
    border-2
    rounded-md
    outline-none
    focus:border-sky-100
    focus:border-2
    transition
    disabledd:bg-nutral-900
    disabledd:opacity-70
    disabledd:cursor-not-allowed
    ${width ? width :'w-full'}
    ${secondry ? 'text-black': 'text-white'}
    ${secondry ? 'bg-white':'bg-black'}
    `}/>
}