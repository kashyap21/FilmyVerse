import React, { useState, useContext } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);


    const addMovie = async () => {
        try {
            if (useAppstate.login) {
                setLoading(true);
                await addDoc(moviesRef, form);
                swal({
                    title: 'Successfully Added',
                    icon: 'success',
                    buttons: false,
                    timer: 3000,
                })
                setLoading(false);
            }
            else{
                navigate('/login')
            }
        } catch (err) {
            swal({
                title: err,
                icon: 'error',
                buttons: false,
                timer: 3000,
            })
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-col text-center w-full mb-4">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-600">Add Movie</h1>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-white">Title</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="year" className="leading-7 text-sm text-white">Year</label>
                                <input
                                    type="text"
                                    id="year"
                                    name="year"
                                    value={form.year}
                                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="image" className="leading-7 text-sm text-white">Image</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-white">Description</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">

                                </textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={addMovie} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                                {loading ? <TailSpin color="white" height={25} /> : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddMovie