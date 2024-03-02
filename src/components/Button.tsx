interface ButtonProps{
    // todo need make Label accept the html elements , so that we can enter the icons in this
    label:string
    fullWidth?:boolean
    secondary?:boolean
    large?:boolean
    onclick:()=> void
    disabled?:boolean
    outline?:boolean
    width?:string
}
export const Button = ({
    label,
    fullWidth,
    secondary,
    large,
    onclick,
    disabled,
    outline,
    width
}:ButtonProps)=>{
    return <button disabled={disabled}
    onClick={onclick}
    className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full':'w-fit'}
        ${width ? width : fullWidth}
        ${secondary ? 'bg-lime-500':'bg-sky-500'}
        ${secondary ? 'text-black':'text-white'}
        ${secondary ? 'border-black':'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5':'px-5'}
        ${large ? 'py-2' : 'p-y2'}
        
        ${outline ? 'border-white': ''}
    `}>
        {label}
    </button>
}