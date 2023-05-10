import React, {useState, useEffect, useContext} from 'react'
import ReactStars from 'react-stars'
import { reviewRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc,query, where,getDocs } from 'firebase/firestore'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom';


const Reviews = ({id, rated, prevRating}) => {
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState("")
    const [data,setData] = useState([]);
    const [newAdded, setNewAdded] = useState(false);

    const sendReview = async() => {
        try{
            if(useAppstate.login){
                setLoading(true);
                await addDoc(reviewRef,{
                    movieid: id,
                    name: useAppstate.username,
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime()
                })
                const ref = doc(db,"movies",id);
                await updateDoc(ref,
                    {   
                        rating: prevRating + 1,
                        rated: rated + 1,
                    })
                setRating(0);
                setForm('');
                swal({
                    title: "review sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
                setLoading(false);
                setNewAdded(true);
            }
            else{
                navigate('/login')
            }
        }
        catch (err) {
            swal({
                title: err.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
    }

    useEffect(() => {
        async function getData() {
            setData([]);
            console.log(id);
            let quer = query(reviewRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(quer)

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev,doc.data()])
            })
        }
        getData();
    }, [newAdded]);

    return (
        <div className="mt-2  border-t-2 border-green-700 w-full">
            <ReactStars
                size={45}
                half={true}
                edit={true}
                value = {rating}
                onChange={(rate) => setRating(rate)}
            />

            <input
                placeholder='Share your thoughts here...'
                value = {form}
                onChange={(e) => setForm(e.target.value)}
                className='w-full p-2 outline-none header'
            />

            <button onClick={sendReview} className="bg-green-600 flex justify-center w-full p-1">
                { loading ? <TailSpin height={15} color = "white" /> : "Share" }
            </button>

            <div>
                {
                    data.map((e,i)=>{
                        return(
                            <div>
                                <div className="mt-2 mb-2  py-2 border-b-2  border-green-700">
                                    <div>
                                        <span className="text-blue-400">{e.name}</span> ({ new Date(e.timestamp).toLocaleString('en-US')})
                                    </div>
                                    <div>
                                        <ReactStars 
                                        height={20}
                                        value = {e.rating}
                                        edit = {false}
                                        half = {false}
                                        />
                                    </div>
                                    <div>
                                        {e.thought}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Reviews