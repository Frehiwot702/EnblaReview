"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000/api';

// Interface based on your actual database columns
interface MediaFile {
  media_id: number;
  file_name: string;
  media_type: string;
  size_bytes: number;
}

const Home = () => {
    const [searchResults, setSearchResults] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Simplified filters - only fileType since that's what exists in DB
    const [filters, setFilters] = useState({
        fileType: 'all'
    });

    const [searchQuery, setSearchQuery] = useState('');

    // Search media files
    const searchMedia = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            if (filters.fileType && filters.fileType !== 'all') {
                params.append('fileType', filters.fileType);
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

    // Handle filter changes
    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Handle viewing files
    const handleViewFile = (file: MediaFile) => {
        if (file.media_type === 'IMAGE') {
            // Open image in new tab
            window.open(`${API_BASE}/files/${file.media_id}`, '_blank');
        } else {
            // For videos and other files, show alert with download option
            alert(`${file.media_type} file: ${file.file_name}\nClick OK to view/download.`);
            window.open(`${API_BASE}/files/${file.media_id}`, '_blank');
        }
    };

    // Load all media files on component mount
    useEffect(() => {
        searchMedia();
    }, []);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Filter results based on search query (client-side filtering)
    const filteredResults = searchResults.filter(file => 
        file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.media_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format file size to readable format
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    return (
        <div className=''>
            <div className='w-full md:flex justify-between p-10 bg-white'>
                <div className='md:w-1/2'>
                    <h3 className='text-[#E52020] font-bold text-4xl'>Multimedia Database</h3>
                    <p className='text-gray-500 md:w-2/3'>
                        Search and browse multimedia files from the database. 
                        Files are stored as BLOBs in Oracle database.
                    </p>
                </div>
                
                <div className='md:w-1/2 text-end space-y-3'>
                    <input
                        type="text"
                        name="search" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder='Search by file name or type...'
                        className='w-full md:w-1/2 text-sm text-gray-600 border border-[#E52020] rounded-full px-4 py-2'
                    />
                    
                    {/* Filters Section */}
                    <div className="flex justify-end space-x-4 items-center">
                        <div className="filter-group">
                            <label className="mr-2 text-sm">File Type:</label>
                            <select 
                                value={filters.fileType} 
                                onChange={handleSearchChange}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                <option value="">All Types</option>
                                <option value="IMAGE">Images</option>
                                <option value="VIDEO">Videos</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        
                        {/* <button 
                            onClick={searchMedia} 
                            disabled={loading}
                            className="bg-[#E52020] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 disabled:bg-gray-400"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="px-10 py-4 bg-gray-50">
                <div className="text-sm text-gray-600">
                    {filteredResults.length} {filteredResults.length === 1 ? 'file' : 'files'} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {filters.fileType !== 'all' && ` (Filtered by: ${filters.fileType})`}
                </div>
            </div>
            
            {/* Media Files Grid */}
            <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredResults.map((file) => (
                    <div 
                        key={file.media_id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                file.media_type === 'IMAGE' ? 'bg-blue-100 text-blue-800' :
                                file.media_type === 'VIDEO' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {file.media_type}
                            </span>
                            <span className="text-xs text-gray-500">
                                {formatFileSize(file.size_bytes)}
                            </span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2 truncate" title={file.file_name}>
                            {file.file_name}
                        </h3>
                        
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-600">
                                ID: {file.media_id}
                            </span>
                            <button 
                                onClick={() => handleViewFile(file)}
                                className="bg-[#E52020] text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            >
                                View File
                            </button>
                        </div>
                    </div>
                ))}
                
                {filteredResults.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchQuery || filters.fileType !== 'all' 
                                ? 'No files found matching your criteria' 
                                : 'No media files found in database'
                            }
                        </p>
                        {(searchQuery || filters.fileType !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilters({ fileType: 'all' });
                                    searchMedia();
                                }}
                                className="mt-4 text-[#E52020] hover:underline"
                            >
                                Clear filters and show all
                            </button>
                        )}
                    </div>
                )}
                
                {loading && (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">Loading media files...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;