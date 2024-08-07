import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { MdAdd } from 'react-icons/md'
import EditNote from '../components/EditNote'
import axiosInstance from '../utils/axios'
import Modal from 'react-modal'

const Home = () => {
    const navigate = useNavigate()
    const [notes, setNotes] = useState({})
    const [userInfo, setUserInfo] = useState(null)
    const [openAddEditModal, setOpenAddEditModal] = useState({
        type: 'add',
        isShown: false,
        data: null,
    })

    // GEY USER
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/user/get-user')
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
            }
        }
    }

    // GET ALL NOTES
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/note/')
            if (response.data) {
                setNotes(response.data)
            }
        } catch (error) {
            console.log('An unexpected error occured!')
        }
    }

    // USE-EFFECT
    useEffect(() => {
        getAllNotes()
        getUserInfo()
        // CLEAN UP FUNCTION
        return () => {}
    }, [])

    console.log(userInfo + '122')
    return (
        <div>
            <Navbar userInfo={userInfo} />
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
                onClick={() =>
                    setOpenAddEditModal({
                        isShown: true,
                        type: 'add',
                        data: null,
                    })
                }
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <EditNote
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    m
                    onClose={() =>
                        setOpenAddEditModal({
                            isShown: false,
                            type: 'add',
                            data: null,
                        })
                    }
                />
            </Modal>
        </div>
    )
}

export default Home
