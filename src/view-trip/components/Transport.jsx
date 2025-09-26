import React from 'react'
import TrainCard from './TrainCard'
import FlightCard from './FlightCard'

function Transport({tripInfo}) {
  return (
    <div className='container mx-auto py-8'>
        <h2 className='font-bold text-2xl md:text-3xl text-gray-800 mb-6'>Travel</h2>
        <div>
            <h2 className='font-bold text-xl mb-4 text-gray-800 mt-2'>Distance by road : {tripInfo?.tripData?.distanceByRoad}</h2>
            <h2 className='font-bold text-xl mb-4 text-gray-800 mt-2'>Time to travel : {tripInfo?.tripData?.timeTotravelByRoad}</h2>
            <TrainCard tripInfo={tripInfo}/>
            <FlightCard tripInfo={tripInfo}/>
        </div>
    </div>
  )
}

export default Transport