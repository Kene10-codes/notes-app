import React from 'react'
import { getInitials } from '../utils/helpers'

const Profile = ({ onLogout, userInfo }) => {
    return (
        <div className="flex items-center  justify-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-medium bg-slate-100">
                {getInitials(userInfo.fullName)}
            </div>

            <div>
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button
                    className="text-sm underline text-slate-500"
                    onClick={onLogout}
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Profile
