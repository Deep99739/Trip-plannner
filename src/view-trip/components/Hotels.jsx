import React from 'react';
import HotelCard from './HotelCard';

function Hotels({ tripInfo }) {
  return (
    <div className='container mx-auto py-8'>
      <h2 className='font-bold text-2xl md:text-3xl text-gray-800 mb-6'>
        Hotel Recommendations
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {tripInfo?.tripData?.hotels?.map((hotel, index) => (
          <div key={index} className='flex justify-center'>
            <HotelCard hotelInfo={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;