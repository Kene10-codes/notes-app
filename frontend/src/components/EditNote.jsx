import React, { useState } from 'react'
import TagInput from './TagInput'

const EditNote = () => {
    const [data, setData] = useState({
        title: '',
        content: '',
    })
    const [tags, setTags] = useState([])

    const handleInputs = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400">Title</label>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleInputs}
                    placeholder="Go to the gym"
                    className="text-xs text-slate-950 outline-none focus:outline-slate-300 p-2"
                />
            </div>

            <div className="flex flex-col gap-2 mt-4 b0">
                <label>Content</label>
                <textarea
                    type="text"
                    name="content"
                    value={data.content}
                    onChange={handleInputs}
                    className="text-sm bg-slate-200 p-3 focus:outline-slate-300"
                    rows={10}
                    placeholder="Message here..."
                />
            </div>

            <div className="mt-3">
                <label htmlFor="" className="input-label">
                    TAGS
                </label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            <button className="w-full bg-blue-500 text-white font-medium mt-5 p-3">
                ADD
            </button>
        </div>
    )
}

export default EditNote
