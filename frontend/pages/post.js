import { useState } from 'react'

const Home = () => {
  const [input, setInput] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: input,
        })
      })
      
      if (1) {
        alert('You are subscribed!')
      } else {
        alert('Sorry, something went wrong.')
      }
    } catch(err) {
      alert(err)
    }
  }

  return (
    <div className='p-8 justify-center items-center h-screen flex'>
      <form className='flex'>
        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' id='email' type='email' aria-label='email address' placeholder='Enter your email address' value={input} onChange={e => setInput(e.target.value)} />
        <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r' type='submit' onClick={subscribe}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Home