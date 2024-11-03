"use client"

export const TextInput = ({ placeholder, label, onChange } : {
    placeholder: string,
    label: string,
    onChange: (value: string) => void
}) => {

    return <div className='my-2'>
        <label className='text-[18px] font-semibold'>{label}</label>
        <input
            className='my-2 p-2 pl-4 w-full text-[18px] focus:outline-none border-black border-[2px] rounded-md' 
            type='text'
            placeholder={placeholder}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        />
    </div>
}