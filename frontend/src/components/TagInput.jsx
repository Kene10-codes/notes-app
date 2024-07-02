import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('')

    // HANDLE INPUT VALUE
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // HANDLE ADD NEW TAG
    const addNewTag = () => {
        setTags({ ...tags, inputValue })
        setInputValue('')
    }

    // HANDLE KEY ROWS
    const handleKeyRows = (e) => {
        if (e.key == 'Enter') {
            addNewTag()
        }
    }

    // HANDLE REMOVE TAG
    const handleRemoveTag = (tagRemover) => {
        setTags(tags.filter((tag) => tag !== tagRemover))
    }
    return (
        <div>
            <div>
                {tags.length > 0 && (
                    <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
                        {tags?.map((tag, index) => {
                            ;<span
                                key={index}
                                className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1"
                            >
                                #{tag}
                                <button
                                    className=""
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <MdClose />
                                </button>
                            </span>
                        })}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyRows}
                />

                <button
                    onClick={() => {
                        addNewTag()
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
                >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>
        </div>
    )
}

export default TagInput
