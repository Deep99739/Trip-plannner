import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDollar, AiFillStar } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import GlobalAPI from '@/services/GlobalAPI';

function HotelCard({ hotelInfo }) {
  const [photoUrl, setPhotoUrl] = useState(null);  
  const [loading, setLoading] = useState(true); 

  const handlePhotoFetched = (url) => {
    setPhotoUrl(url);
    setLoading(false); 
  };

  return (
    <div className="h-full">
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotelInfo.name + "," + hotelInfo.address} target="_blank">
        <div className="hover:scale-105 transition-all cursor-pointer h-full flex flex-col">
          <GlobalAPI
            name={hotelInfo.name}
            address={hotelInfo.address}
            onPhotoFetched={handlePhotoFetched}
          />

         
            <div className="relative">
            {!loading && photoUrl && (
                <img src={photoUrl} alt={hotelInfo.name} className="rounded-xl w-full h-40 object-cover" />
            )}
            </div>



          <div className="flex flex-col my-2 flex-grow">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-black">{hotelInfo.name}</h2>
              <h2 className="font-medium flex items-center gap-1 text-gray-600">
                <AiFillStar className="text-yellow-400 hover:text-yellow-500" />
                {hotelInfo?.rating}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 my-3">
              <FaMapMarkerAlt className="text-pink-500" />
              <span>{hotelInfo.address}</span>
            </div>

            <Button className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 mt-auto">
              <AiOutlineDollar />
              <span>{hotelInfo.price}</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
