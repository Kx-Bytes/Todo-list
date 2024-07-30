import React from 'react'

const navbar = () => {
  return (
    <div className='flex justify-evenly bg-indigo-600 text-white py-2'>
        <div className='mx-9 font-bold text-2xl'>iTask</div>
        <div className='flex justify-evenly'>
            <div className='px-10 cursor-pointer hover:font-bold transition-all pt-1'>Home</div>
            <div className='px-10 cursor-pointer hover:font-bold transition-all pt-1'>Your Task</div>
        </div>
      
    </div>
  )
}

export default navbar


