import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'

const Card = ({
    tags,
    title,
    isPinned,
    date,
    content,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className="border  rounded p-4 bg-white hover:shadow-teal-50 transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium">{title}</h4>
                    <span className="text-sm text-slate-500">{date}</span>
                </div>

                <MdOutlinePushPin
                    className={`${isPinned} ? 'text-blue-500' : 'text-white' cursor-pointer`}
                    onClick={onPinNote}
                />
            </div>
            <p className="text-slate-500 mt-2">{content?.slice(0, 60)}</p>
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500">{tags}</div>

                <div className="flex items-center gap-2">
                    <MdCreate
                        className="text-slate-300 cursor-pointer hover:text-green-600"
                        onClick={onEdit}
                    />
                    <MdDelete
                        className="icon-btn hover:text-red-500 cursor-pointer"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card
