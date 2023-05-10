import React from 'react'
import {useState, useContext} from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert"
import {query, where, getDocs } from 'firebase/firestore'
import { usersRef } from '../firebase/firebase'
import bcrypt from 'bcryptjs'
import { Appstate } from '../App'


const Login = () => {
    const navigate = useNavigate();
    const useAppstate =  useContext(Appstate);
    const [form, setForm] = useState({
        mobile:0,
        password:""
    })

    const [loading, setLoading] = useState(false)
    const login = async () => {
        setLoading(true);
        try{
            const quer = query(usersRef,where('mobile','==',form.mobile))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password,_data.password)
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: 'Login',
                        icon: "success",
                        buttons: false,
                        timer:1300
                    })
                    navigate('/')
                }
                else {
                    swal({
                        title: 'Invalid Credentials',
                        icon: "error",
                        buttons: false,
                        timer:5000
                    })
                }
            })

        } catch (err)
        {
            swal({
                title: 'err.message',
                icon: "error",
                buttons: false,
                timer:5000
            })
        }
        setLoading(false);
    }

    return (
        <div className="w-full flex flex-col mt-4 justify-center items-center">
            <h1 className="text-xl font-fold">Login</h1>
            <div className="p-2 w-1/3">
                <div className="relative">
                    <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile No.</label>
                    <input
                        onChange={(e)=> setForm({...form,mobile:e.target.value})}
                        type="number"
                        id="mobile"
                        name="mobile"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>
            <div className="p-2 w-1/3">
                <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                    <input
                        onChange={(e) => setForm({...form,password:e.target.value})}
                        type="password"
                        id="password"
                        name="password"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>
            <div className="p-2 w-full">
                <button onClick = {login} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    {loading ? <TailSpin color="white" height={25} /> : 'Login'}
                </button>
            </div>
            <div className='mt-2'>
                <p>Do not have account? <Link to = {'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
            </div>
        </div>
    )
}

export default Login