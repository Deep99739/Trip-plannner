import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import GlobalAPI from '@/services/GlobalAPI';

function PlaceCard({ placeInfo }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  const handlePhotoFetched = (url) => {
    console.log('Setting photo URL:', url);
    setPhotoUrl(url);
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + placeInfo?.name} target='_blank' className='no-underline'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        
        <GlobalAPI
          name={placeInfo?.name}
          address={placeInfo?.address}
          onPhotoFetched={handlePhotoFetched}
        />

        <img className='h-[150px] w-[150px] rounded-xl' src={photoUrl} alt={placeInfo?.name} />
        <div>
          <h2 className='font-bold text-lg text-black'>{placeInfo?.name}</h2>
          <p className='text-black'>{placeInfo?.details}</p> 
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
