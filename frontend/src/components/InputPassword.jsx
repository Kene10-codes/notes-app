import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const InputPassword = ({ value, onChange, placeholder, name }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    // TOGGLE PASSWORD FUNC
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    return (
        <div className="relative">
            <input
                type={isShowPassword ? 'text' : 'password'}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder || 'Password'}
                className="border p-1 placeholder:text-sm h-10 focus:outline focus:outline-blue-300 w-full"
            />

            <div className="absolute left-72 bottom-1">
                {isShowPassword ? (
                    <FaRegEye
                        size={18}
                        className="text-slate-500 cursor-pointer"
                        onClick={() => toggleShowPassword()}
                    />
                ) : (
                    <FaRegEyeSlash
                        size={18}
                        className="text-slate-500 cursor-pointer"
                        onClick={() => toggleShowPassword()}
                    />
                )}
            </div>
        </div>
    )
}

export default InputPassword
