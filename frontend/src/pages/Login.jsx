import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import InputPassword from '../components/InputPassword'
import { validateEmail } from '../utils/helpers'
import axiosInstance from '../utils/axios'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        emailError: null,
        passwordError: null,
    })

    // HANDLE INPUT CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }

    // HANDLE LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(data.email)) {
            setError({
                emailError: 'Please enter a valid email',
                passwordError: '',
            })
            return
        }

        if (!data.password) {
            setError({
                emailError: '',
                passwordError: 'Please enter a valid password',
            })
            return
        }

        // API CALL
        try {
            const response = await axiosInstance.post('/user/login', {
                email: data.email,
                password: data.password,
            })

            if (response.data & response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken)
                // NAVIGATE TO DASHBOARD
                navigate('/dashboard')

                // CLEAR ERRORS
                setError({
                    emailError: '',
                    passwordError: '',
                })
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else {
                setError('An unexpected error occured')
            }
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-3 text-center font-black text-blue-700">
                            Login
                        </h4>
                        <div className="flex  flex-col py-2">
                            <label
                                htmlFor="email"
                                className="pb-1 text-black-600 text-slate-500"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={handleInputChange}
                                name="email"
                                className="input-box border p-1 placeholder:text-sm h-10 focus:outline focus:outline-blue-300"
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
                            />{' '}
                        </div>

                        {error.passwordError && (
                            <p className="text-red-500 text-sm font-semibold ">
                                {error.passwordError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn-primary bg-blue-700 my-2.5 h-10 w-full text-white py-1 font-semibold cursor-pointer text-md "
                        >
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Not registered yet?{' '}
                            <Link
                                to="/register"
                                className="text-medium underline text-blue-700"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
