import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

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
                />
            </div>
        </div>
    )
}

export default Home
