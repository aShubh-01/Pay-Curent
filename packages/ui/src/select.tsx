"use client"

export const Select = ({ options, onSelect } : {
    options: {
        key: string;
        value: string;
    }[],
    onSelect: (value: string) => void
}) => {

    return <select className='my-2 w-full font-semibold text-center bg-white border-black border-[2px] rounded-md py-3' 
    onChange={(e) => {
        onSelect(e.target.value)
    }}>
        {options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
    </select>
}