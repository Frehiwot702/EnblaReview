"use client";
import axios from 'axios';
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

const API_BASE = 'http://localhost:5000/api';

interface Data {
    media_id: number;
    file_name: string;
    media_type: string;
    size_bytes: string;
}

const Home = () => {
    // const filterItem = ["Ethiopian Food", "Fast Food", "Salad", "Snaks", "Ice Cream"];
    const [searchResults, setSearchResults] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        fileType: 'all',
        date: '',
        location: ''
    });
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

    const searchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.fileType && filters.fileType !== 'all') {
        params.append('fileType', filters.fileType);
      }
      if (filters.date) {
        params.append('date', filters.date);
      }
      if (filters.location) {
        params.append('location', filters.location);
      }
      
      const response = await axios.get(`${API_BASE}/search?${params}`);
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching media files');
    } finally {
      setLoading(false);
    }
  };


    const handleFilterChange = (key: any, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleViewFile = (file: File) => {
    if (file.media_type === 'IMAGE') {
      window.open(`${API_BASE}/file/${file.media_id}`, '_blank');
    } else {
      alert(`Video files need special handling. File: ${file.file_name}`);
    }
  };

  useEffect(() => {
    searchMedia();
  }, []);

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
                <h3 className='text-[#E52020] font-bold text-4xl'>Google V 2.0</h3>
                <p className='text-gray-500 md:w-2/3'>This is a multimedia database implementation project implemented by CS_2025 Computer Science Masters students.</p>

            </div>
            {/* Search Results Count */}
            <div className="text-sm text-gray-600 mb-4">
                {searchResults?.length} {searchResults?.length === 1 ? 'item' : 'items'} found
                {searchQuery && ` for "${searchQuery}"`}
          <div className="filter-group">
            <label>File Type:</label>
            <select 
              value={filters.fileType} 
              onChange={(e) => handleFilterChange('fileType', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="IMAGE">Images</option>
              <option value="VIDEO">Videos</option>
              <option value="OTHER-a">Other</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Date (DD/MM/YYYY):</label>
            <input 
              type="text" 
              placeholder="01/01/2018"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />
          </div>
        <div className="filter-group">
            <label>Location:</label>
            <input 
              type="text" 
              placeholder="Addis"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
          <button onClick={searchMedia} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
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
            { searchResults?.map((item) => (
                <div key={item.media_id}>
                   <button onClick={() => handleViewFile(item)}>
                        View
                    </button>
                    <h3 className='text-xl font-bold'>{item.file_name}</h3>
                    <h4>Food: {item.media_type}</h4>
                    <h4>Location: {item.size_bytes}</h4>
                    <h4 className='text-[#E52020]'>rating: {item.rating}/5</h4>
                    <Link href={`/${item.media_id}`}>View Detail</Link>
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