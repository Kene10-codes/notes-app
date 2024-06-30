import React from 'react'

const EditNote = () => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400">Title</label>
                <input
                    type="text"
                    placeholder="Go to the gym"
                    className="text-xs text-slate-950 outline-none"
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label>Content</label>
                <textarea type="text" className="text-sm text-slate-900" />
            </div>
        </div>
    )
}

export default EditNote
