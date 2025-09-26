import React, { useEffect, useState } from 'react';
import Autocomplete from '@/components/autocomplete';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList, systemprompt } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { chatSession } from '@/services/aimodel';
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/services/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function CreateTrip() {
  const [formData, setFormData] = useState({
    startingPoint: '',
    destination: '',
    days: '',
    budget: '',
    companions: '',
  });

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('formData updated:', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (resp) => {
      getUserProfile(resp);
    },
    onError: (error) => console.log(error)
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.startingPoint || !formData.destination || !formData.budget || !formData.companions) {
      toast("Please fill all the details before generating trip!", {
        className: 'sonner-toast-nudge',
        style: {
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fca5a5',
        },
      });
    } else {
      setLoading(true);

      toast.info('Getting trip details...', {
        duration: 5000,
        style: {
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #93c5fd',
        },
      });

      setTimeout(() => {
        toast.info('Getting hotel recommendations...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 5000);

      setTimeout(() => {
        toast.info('Creating trip plan...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 10000);

      setTimeout(() => {
        toast.info('Generating trip details...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 15000);

      const final_prompt = systemprompt
        .replace('{startingPoint}', formData?.startingPoint)
        .replace('{destination}', formData?.destination)
        .replace('{days}', formData?.days)
        .replace('{budget}', formData?.budget)
        .replace('{companions}', formData?.companions);

      const result = await chatSession.sendMessage(final_prompt);
      setLoading(false);
      SaveTrip(result?.response?.text());
    }
  };

  const SaveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      userName: user?.given_name,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    )
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className='max-w-4xl mx-auto px-5 mt-10'>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
          },
        }}
      />
      <h2 className='font-bold text-3xl text-center'>Tell us your travel preferences 🏕️🌴🌊</h2>
      <p className='mt-3 text-gray-500 text-xl text-center'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where are you starting at? 🏡</h2>
          <Autocomplete
            onSelect={(suggestion) =>
              handleInputChange('startingPoint', suggestion.description)
            }
            selectProps={{
              place: formData.startingPoint,
              onchange: (v) => handleInputChange('startingPoint', v),
            }}
          />
        </div>
      </div>
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice? 📍</h2>
          <Autocomplete
            onSelect={(suggestion) =>
              handleInputChange('destination', suggestion.description)
            }
            selectProps={{
              place: formData.destination,
              onchange: (v) => handleInputChange('destination', v),
            }}
          />
        </div>
      </div>
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning to stay?</h2>
        <Input
          placeholder={'Ex. 3 days'}
          type="number"
          value={formData.days}
          onChange={(e) => handleInputChange('days', e.target.value)}
        />
      </div>
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-all
                ${formData.budget === item.title
                ? 'border-pink-300 shadow-lg shadow-pink-200/50 bg-pink-50'
                : 'border-gray-200'
                }
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>Who are you planning to go with on your next trip?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('companions', item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-all
                ${formData.companions === item.title
                ? 'border-pink-300 shadow-lg shadow-pink-200/50 bg-pink-50'
                : 'border-gray-200'
                }
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              <h2 className='flex flex-col text-sm text-gray-500 mt-1'>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-20 flex justify-end'>
        <Button className='w-full md:w-auto' onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
              <p className='mt-1'>Securely sign in with Google account</p>
              <Button
                onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7 flex' />Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;