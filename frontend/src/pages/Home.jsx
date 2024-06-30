import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { MdAdd } from 'react-icons/md'
import EditNote from '../components/EditNote'

const Home = () => {
    return (
        <div>
            <Navbar />

            <div className="container mx-auto">
                <Card
                    title="Understanding JavaScript"
                    date="04-11-2022"
                    content="Beginners appraoch to understanding JavaScript"
                    tags="Programming"
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 absolute right-10 bottom-10 hover:bg-blue-600"
                onClick={() => {}}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <EditNote />
        </div>
    )
}

export default Home
