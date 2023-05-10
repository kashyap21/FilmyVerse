import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { moviesRef, reviewRef } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import Reviews from './Reviews';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        year: '',
        image: '',
        description: '',
        rating: 0,
        rated: 0
    });

    useEffect(() => {
        async function getData() {
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);
            setData(_data.data());
        }
        getData();
    }, [])

    return (
        <div className='p-4 mt-4 flex flex-col md:flex-row w-full justify-center'>
            <img className='h-96 p-1 md:sticky top-20' src={data.image} alt='Poster detail' />
            <div className='ml-0 md:ml-4  p-1 w-full md:w-1/2'>
                <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
                <ReactStars
                    size={20}
                    half={true}
                    value={data.rating / data.rated}
                    edit={false}
                />
                <p className='mt-2'>{data.description}</p>

                <Reviews id={id} rated={data.rated} prevRating={data.rating} />
            </div>
        </div>
    )
}

export default Detail