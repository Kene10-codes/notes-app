import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const Search = ({ value, onChange, handleSeach, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center justify-center rounded-md bg-slate-100">
            <input
                type="text"
                placeholder="Search here..."
                onChange={onchange}
                className="w-full text-xs bg-transparent outline-none p-[11px]"
            />

            <FaMagnifyingGlass
                size={18}
                className="text-slate-400 cursor-pointer hover:text-slate-100"
            />
        </div>
    )
}

export default Search
