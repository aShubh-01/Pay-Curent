"use client"

export const Select = ({ options, onSelect } : {
    options: {
        key: string;
        value: string;
    }[],
    onSelect: (value: string) => void
}) => {

    return <select className='text-center border-black border-[2px] rounded-md p-1' 
    onChange={(e) => {
        onSelect(e.target.value)
    }}>
        {options.map(option => <option value={option.key}>{option.value}</option>)}
    </select>
}