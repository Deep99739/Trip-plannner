import { useState, React } from 'react';
import GlobalAPI from '@/services/GlobalAPI';
import { Link } from 'react-router';

function UserTripCard({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlePhotoFetched = (url) => {
        setPhotoUrl(url);
        setLoading(false);
    };
    return (
        <Link to={`/view-trip/${trip?.id}`}>
        <div className='hover:scale-105 transition-all hover:shadow-md'>

            <GlobalAPI
                name={trip.tripData.destination}
                address={trip.tripData.destination}
                onPhotoFetched={handlePhotoFetched}
            />

            <div className="relative">
                {!loading && photoUrl && (
                    <img src={photoUrl} alt={trip.tripData.destination} className="rounded-xl w-full h-[200px] object-cover" />
                )}
            </div>

            <div>
                <h2 className='font-bold text-lg text-black'>{trip?.tripData.destination}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection.days} day {trip?.userSelection.budget} budget trip with {trip?.userSelection.companions}</h2>
            </div>
        </div>
        </Link>
    )
}

export default UserTripCard