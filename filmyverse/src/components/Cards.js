import React, { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore';
import {  TailSpin } from 'react-loader-spinner';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';
// {
//     name: 'Forest Gump',
//     year: '1984',
//     img: 'https://www.themoviedb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
//     rating: 2.5
// },



const Cards = () => {
    const [data, setData] = useState([]);

    const[loading, setLoading] = useState(false);


    useEffect(()=>{
      async function getData(){
        setLoading(true);
        const _data = await getDocs(moviesRef)
        _data.forEach((doc) => {
            setData((prv) => [...prv, {...doc.data(),id:doc.id}])
        })
        setLoading(false);
      }
      getData();
    },[]);
    return (
        <div className="flex flex-wrap justify-between p-3 mt-2">            
            {loading ? <div className="w-full flex justify-center items-center min-h-screen h-96"><TailSpin height={40} color = "white" /> </div>:
                data.map((element,index) => {
                    return (
                        <Link to ={`/detail/${element.id}`}><div key={index} className="card shadow-lg p-2 hover:translate-y-3 font-medium mt-5 transition-all duration-500">
                            <img className='h-60 md:h-72' src={element.image} alt='poster'></img>
                            <h1><span className='text-gray-500'>Name:</span> {element.title}</h1>
                            <h1 className='flex items-center'><span className='text-gray-500'>Rating:</span>
                                <ReactStars 
                                size={20}
                                half={true}
                                value={element.rating / element.rated}
                                edit = {false}
                                />
                            </h1>
                            <h1><span className='text-gray-500'>Year:</span> {element.year}</h1>
                        </div></Link>
                    );
                })
            }
        </div>
    )
}

export default Cards