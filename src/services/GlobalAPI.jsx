import React, { useEffect, useState } from 'react';

function GlobalAPI({ name, address, onPhotoFetched }) {
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!name || !address) {
        onPhotoFetched('/placeholder.jpg');
        setLoading(false); // Stop loading if no name or address
        return;
      }

      try {
        const searchQuery = name;
        const findPlaceUrl = `https://maps.gomaps.pro/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&locationbias=ipbias&language=en&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

        const findPlaceResponse = await fetch(findPlaceUrl);
        const findPlaceData = await findPlaceResponse.json();

        if (findPlaceData.status === 'OK' && findPlaceData.candidates?.[0]?.place_id) {
          const placeId = findPlaceData.candidates[0].place_id;
          const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&language=en&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

          const placeDetailsResponse = await fetch(placeDetailsUrl);
          const placeDetailsData = await placeDetailsResponse.json();

          if (placeDetailsData.status === 'OK' && placeDetailsData.result?.photos?.[0]?.photo_reference) {
            const photoReference = placeDetailsData.result.photos[0].photo_reference;
            const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxHeight=3000&maxwidth=3000&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

            onPhotoFetched(photoUrl);
          } else {
            onPhotoFetched('/placeholder.jpg');
          }
        } else {
          onPhotoFetched('/placeholder.jpg');
        }
      } catch (error) {
        onPhotoFetched('/placeholder.jpg');
      } finally {
        setLoading(false); // Stop loading when fetch is done
      }
    };

    fetchPhoto();
  }, [name, address, onPhotoFetched]);

  return loading ? (
    <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg">
      {/* Elegant Loading Animation */}
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
      </div>
    </div>
  ) : null;
}

export default GlobalAPI;