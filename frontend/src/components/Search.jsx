import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const Search = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center justify-center rounded-md bg-slate-100">
            <input
                value={value}
                type="text"
                placeholder="Search here..."
                onChange={onChange}
                className="w-full text-xs bg-transparent outline-none p-[11px]"
            />
            {console.log(value)}
            {value ? (
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-black mr-2"
                    onClick={onClearSearch}
                />
            ) : (
                ''
            )}
            <FaMagnifyingGlass
                size={18}
                className="text-slate-400 cursor-pointer hover:text-slate-100"
                handleSearch={handleSearch}
            />
        </div>
    )
}

export default Search
