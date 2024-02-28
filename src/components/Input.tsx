interface InputProps{
    placeholder?:string
    value?:string
    type?:string
    disabled?:boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input = ({
    disabled,
    onChange,
    type,
    value,
    placeholder,
}:InputProps)=>{
    const sanitisedValue = value||''
    return <input
        disabled={disabled}
        onChange={onChange}
        value={sanitisedValue}
        placeholder={placeholder}
        type={type}
        className="
    w-full
    p-2
    text-lg
    bg-black
    border-2
    rounded-md
    outline-none
    text-white
    focus:border-sky-100
    focus:border-2
    transition
    disabledd:bg-nutral-900
    disabledd:opacity-70
    disabledd:cursor-not-allowed"/>
}