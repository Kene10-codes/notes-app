import React, { useState } from 'react'

const InputPassword = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    return (
        <div>
            <input
                type={isShowPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={'Password'}
                className="border p-1 placeholder:text-sm focus:outline focus:outline-blue-300 w-full"
            />
        </div>
    )
}

export default InputPassword
