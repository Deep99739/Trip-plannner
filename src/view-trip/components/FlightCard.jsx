import React from 'react';

function FlightCard({ tripInfo }) {
  return (
    <div>
      <div className='font-bold text-xl mb-4 mt-6 text-gray-800'>Flights</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
        {tripInfo?.tripData?.travelDetails?.flights?.map((flight, index) => (
          <div
            key={index}
            className='bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-blue-100 w-52'
          >
            <h2 className='text-lg font-semibold mb-2 text-blue-800'>{flight?.airline + " " + flight?.flightNumber}</h2>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Departure:</span> {flight?.departureTime}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Arrival:</span> {flight?.arrivalTime}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Duration:</span> {flight?.duration}
            </p>
            <p className='text-gray-700 mb-1'>
              <span className='font-bold text-blue-600'>Price:</span> {flight?.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightCard;