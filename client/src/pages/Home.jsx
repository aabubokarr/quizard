import React from 'react'
import toast from 'react-hot-toast'

const Home = () => {
  return (
    <div className='text-center'><button onClick={() => toast.success("It worked")}>Click me</button>Home</div>
  )
}

export default Home