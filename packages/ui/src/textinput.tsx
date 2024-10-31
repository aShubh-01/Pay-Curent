"use client"

export const TextInput = ({ placeholder, label, onChange } : {
    placeholder: string,
    label: string,
    onChange: (value: string) => void
}) => {

    return <div>
        <label className=''>{label}</label>
        <input
            className='p-1 pl-4 w-[350px] text-[18px] focus:outline-none border-black border-[2px] rounded-md' 
            type='text'
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}