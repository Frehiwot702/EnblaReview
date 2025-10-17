"use client";
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  rating: number;
  restaurantName: string;
  price?: number;
  category?: string;
  // add other properties as needed
}

interface FoodSearchProps {
  foodItems: FoodItem[];
}

const Home = ({ foodItems }: FoodSearchProps) => {
    const filterItem = ["Ethiopian Food", "Fast Food", "Salad", "Snaks", "Ice Cream"];
    const data = [
        {
            id: 1,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
        {
            id: 2,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
        {
            id: 3,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
        {
            id: 4,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
        {
            id: 5,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
            {
            id: 6,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        },
        {
            id: 7,
            restaurant: 'Happy Pizzeria',
            food: 'Chicken Sandwich',
            rating: 4,
            comment: 'The best sandwich ever, try it out its only 300 Birr!',
            location: 'Addis Ababa, Ethiopia',
            media: './food.jpg'
        }
    ]
    const[searchQuery, setSearchQuery] = useState('')
    const [reviews, setreviews] = useState(data);

    useEffect(() => {
        console.log('Fetch data');
    }, [])

    const filteredFoodItems = useMemo(() => {
        if (!searchQuery.trim()) {
            return reviews;
        }


    const query = searchQuery.toLowerCase().trim();
    
    return reviews.filter((item) => {
      return (
        item.food.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.restaurant.toLowerCase().includes(query) ||
        item.media?.toLowerCase().includes(query) ||
        false
      );
    });
  }, [reviews, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=''>
        <div className='w-full md:flex justify-between p-10 bg-white'>
            <div className='md:w-1/2'>
                <h3 className='text-[#E52020] font-bold text-4xl'>Enibla Review</h3>
                <p className='text-gray-500 md:w-2/3'>Discover your next great meal, share your own experience, and help others find their perfect spot.</p>

            </div>
            {/* Search Results Count */}
            <div className="text-sm text-gray-600 mb-4">
                {filteredFoodItems?.length} {filteredFoodItems?.length === 1 ? 'item' : 'items'} found
                {searchQuery && ` for "${searchQuery}"`}
            </div>
            <div className='md:w-1/2 text-end space-y-3'>
                <input
                    type="text"
                    name="search" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder='Search for foods, restaurants,...'
                    className='w-full md:w-1/2 text-sm text-gray-600 border border-[#E52020] rounded-full px-4 py-2'
                />
                <div>
                    <Link 
                        href='/addreview'
                        className='bg-[#E52020] text-white px-3 py-1 rounded-md'>Add review</Link>
                </div>
                
            </div>
        </div>
        {/* <div className='space-x-5 px-10'>
            {filterItem?.map((item) => (
                <span 
                    key={item}
                    className='border border-[#E52020] rounded-full px-3 py-1'>{item}</span>
            ))}
        </div> */}
        
        <div className='p-10 grid grid-cols-5 gap-8'>
            { filteredFoodItems?.map((item) => (
                <div key={item.id}>
                    <img 
                        src={item.media}
                        alt="food image" 
                        className='h-42 w-full object-cover rounded-md'/>
                    <h3 className='text-xl font-bold'>{item.restaurant}</h3>
                    <h4>Food: {item.food}</h4>
                    <h4>Location: {item.location}</h4>
                    <h4 className='text-[#E52020]'>rating: {item.rating}/5</h4>
                    <Link href={`/${item.id}`}>View Detail</Link>
                </div>))
            } 
            {filteredFoodItems?.length === 0 && searchQuery && (
                <div className="w-full text-center py-8">
                    <p className="text-gray-500">No food items found matching {searchQuery}</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-[#E52020] hover:underline"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Home