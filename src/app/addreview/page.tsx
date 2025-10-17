import React from 'react'

const AddReview = () => {
  return (
    <div>
      <h3>
        <div className='w-full md:flex justify-between p-10 bg-white'>
            <div className='md:w-1/2'>
                <h3 className='text-[#E52020] font-bold text-4xl'>Enibla Review</h3>
                <p className='text-gray-500 '>Discover your next great meal, share your own experience, and help others find their perfect spot.</p>

            </div> 
        </div>
        <div>
          <h3 className='text-2xl text-center font-bold text-[#E52020] py-5'>Add Review</h3>
          <form>
            <div className='w-3/8 mx-auto space-y-5'> 
              <input 
                type='text'
                placeholder='Food name'
                className='w-full text-md border border-[#E52020] rounded-full px-5 py-2'/>
              <input 
                type='text'
                placeholder='Restaurant'
                className='w-full text-md border border-[#E52020] rounded-full px-5 py-2'/>
              <input 
                type='text'
                placeholder='Location'
                className='w-full text-md border border-[#E52020] rounded-full px-5 py-2'/>
              <input 
                type='text'
                placeholder='Date'
                className='w-full text-md border border-[#E52020] rounded-full px-5 py-2'/>
              <input 
                type='file' 
                className='w-full text-md border border-[#E52020] rounded-full px-5 py-2'/>
              
              <input
                type='submit'
                className='bg-[#E52020] text-white font-bold px-4 py-2 rounded-full'
              />
            </div>
          </form>
        </div>
      </h3>
    </div>
  )
}

export default AddReview