import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Search from './Search'

const Navbar = () => {
    const [logout, setLogout] = useState(false)
    const Navigate = useNavigate()

    const onLogout = () => {
        Navigate('/login')
        setLogout(true)
    }
    return (
        <div className="bg-white flex items-center justify-between p-6 drop-shadow">
            <h2 className="font-semibold text-xl text-black py-2">Notes</h2>
            <Search />
            <Profile onLogout={onLogout} />
        </div>
    )
}

export default Navbar
