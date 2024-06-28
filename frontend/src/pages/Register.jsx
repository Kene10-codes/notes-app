import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import InputPassword from '../components/InputPassword'
import { validateEmail } from '../utils/helpers'

const Register = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        emailError: null,
        password: null,
    })

    // HANDLE INPUT CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    // HANDLE FORM REGISTRATION
    const handleRegistration = (e) => {
        e.preventDefault()

        if (!validateEmail(data.email)) {
            setError({
                passwordError: '',
                emailError: 'Please enter a valid email address',
            })
            return
        }

        if (!data.password) {
            setError({
                emailError: '',
                passwordError: 'Please enter the password',
            })
            return
        }

        // CLEAR ERRORS
        setError({
            emailError: '',
            passwordError: '',
        })
    }
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleRegistration}>
                        <h4 className="text-2xl mb-3 text-center font-black text-blue-700">
                            Create An Account
                        </h4>
                        <div className="flex  flex-col py-2">
                            <label
                                htmlFor="email"
                                className="pb-1 text-slate-500"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                className="input-box border p-1 h-10  placeholder:text-sm focus:outline focus:outline-blue-300"
                            />
                        </div>

                        {error.emailError && (
                            <p className="text-red-500 text-sm font-semibold ">
                                {error.emailError}
                            </p>
                        )}
                        <div className="flex  flex-col py-2">
                            <label
                                htmlFor="password"
                                className="pb-1 text-slate-500"
                            >
                                Password
                            </label>
                            <InputPassword
                                placeholder={'Enter your password'}
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>
                        {error.passwordError && (
                            <p className="text-red-500 text-sm font-semibold ">
                                {error.passwordError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn-primary bg-blue-700 my-2.5 w-full h-10 text-white py-1 font-semibold cursor-pointer text-md "
                        >
                            Register
                        </button>

                        <p className="text-sm text-center mt-4">
                            Already Have An Account?{' '}
                            <Link
                                to="/login"
                                className="text-medium underline text-blue-700"
                            >
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
