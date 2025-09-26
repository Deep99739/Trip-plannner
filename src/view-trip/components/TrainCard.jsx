import React from 'react';

function TrainCard({ tripInfo }) {
  return (
    <div>
      <div className='font-bold text-xl mb-4 text-gray-800 mt-10'>Trains</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
        {tripInfo?.tripData?.travelDetails?.trains?.map((train, index) => (
          <div
            key={index}
            className='bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-blue-100 w-52'
          >
            <h2 className='text-lg font-semibold mb-2 text-blue-800'>{train?.name}</h2>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Train Number:</span> {train?.number}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Departure:</span> {train?.departureTime}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Arrival:</span> {train?.arrivalTime}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Duration:</span> {train?.duration}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Price:</span> {train?.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainCard;