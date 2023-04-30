import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="sticky z-10 header top-0 text-2xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
        <Link to = {'/'}><span>Filmy<span className="text-white">verse</span></span></Link>
        <Link to = {'/addmovie'}><h1 className='text-lg text-white cursor-pointer flex items-center'>
            <Button>Add New <AddIcon className='mr-2' color ='inherit'/> </Button>
        </h1></Link>
    </div>
  )
}

export default Header