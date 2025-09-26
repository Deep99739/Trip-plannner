import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseconfig';
import { toast } from 'sonner'
import InfoSection from '../components/InfoSection';
import { Hotel } from 'lucide-react';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Footer from '../components/Footer';
import Transport from '../components/Transport';

function ViewTrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])
    
    const  GetTripData = async()=>{
        const docRef=doc(db, "Trips", tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log('No document found !');
            toast('no document found');
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/**information section */}
            <InfoSection tripInfo = {trip}/>
        {/**Trains info*/}
            <Transport tripInfo = {trip}/>
        {/**hotel info and recommendations  */}
            <Hotels tripInfo = {trip}/>
        {/**daily plan and itinerary info*/}
            <Places tripInfo = {trip}/>
        
            <Footer/>



    </div>
  )
}

export default ViewTrip