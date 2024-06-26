import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import InputPassword from '../components/inputPassword'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    // HANDLE INPUT CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={() => {}}>
                        <h4 className="text-2xl mb-3 text-center font-bold text-blue-700">
                            Login
                        </h4>
                        <div className="flex  flex-col py-2">
                            <label
                                htmlFor="email"
                                className="pb-1 text-black-600"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                className="input-box border p-1 placeholder:text-sm focus:outline focus:outline-blue-300"
                            />
                        </div>

                        <div className="flex  flex-col py-2">
                            <label
                                htmlFor="password"
                                className="pb-1 text-black-600"
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

                        <button
                            type="submit"
                            className="btn-primary bg-blue-700 my-2.5 h-14k w-full text-white py-1 font-semibold cursor-pointer text-md "
                        >
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Not registered yet?{' '}
                            <Link
                                to="/register"
                                className="text-medium underline text-blue-700"
                            >
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
