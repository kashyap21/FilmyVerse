import React, { useEffect } from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from '../firebase/firebase'
import swal from "sweetalert"
import bcrypt from 'bcryptjs'
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
const Singup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: 0,
        password: "",
        name: "",
    })


    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const auth = getAuth();

    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
            'size':'invisible',
            'callback': (response) =>{

            }
        },auth);
    }

    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+1${form.mobile}`, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
                text: "OTP sent",
                icon: "success",
                buttons: false,
                timer:3000,
            });
            setOtpSent(true);
            setLoading(false);
        }).catch((error)=>{
            console.log('error');
        })
    }

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password,salt)
            await addDoc(usersRef, {
                name: form.name,
                password: hash,
                mobile: form.mobile,
            })
        } catch(err){
            console.log(err);
        }
    }
    const verifyOTP = () => {
        try{
            setLoading(true);
            window.confirmationResult.confirm(otp).then((result) =>{
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate('/login')
                setLoading(false);
            })
        }
        catch (err){
            console.log(err);
        }
    }
 
    return (
        <div className="w-full flex flex-col mt-4 justify-center items-center">
            <h1 className="text-xl font-fold">Sign up</h1>
            {
                otpSent ?
                    <>
                        <div className="p-2 w-1/3">
                            <div className="relative">
                                <label htmlFor="otp" className="leading-7 text-sm text-white">OTP</label>
                                <input
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="number"
                                    id="otp"
                                    name="otp"
                                    value = {otp}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={verifyOTP} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                                {loading ? <TailSpin color="white" height={25} /> : 'Confirm OTP'}
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="p-2 w-1/3">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                                <input
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
                            <div className="relative">
                                <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile No.</label>
                                <input
                                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
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
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={requestOtp} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                                {loading ? <TailSpin color="white" height={25} /> : 'Request OTP'}
                            </button>
                        </div>
                    </>
            }
            <div className='mt-2'>
                <p>Already have account? <Link to={'/login'}><span className="text-blue-500">Login</span></Link></p>
            </div>
            <div id='recaptcha-container'></div>
        </div>
    )
}

export default Singup