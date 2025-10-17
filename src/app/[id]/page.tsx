"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

const Detail = () => {
    const param = useParams();
    console.log('param: ', param)
  return (
    <div>
        <div className='w-full md:flex justify-between p-10 bg-white'>
            <div className='md:w-1/2'>
                <h3 className='text-[#E52020] font-bold text-4xl'>Enibla Review</h3>
                <p className='text-gray-500 md:w-2/3'>Discover your next great meal, share your own experience, and help others find their perfect spot.</p>

            </div> 
            <div className='md:w-1/2 text-end space-y-3'>
                <div>
                    <Link 
                        href='/ghost'
                        className='bg-[#E52020] text-white px-3 py-1 rounded-md'>Add review</Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Detail