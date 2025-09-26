import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-pink-100 px-4 md:px-16 lg:px-56 py-16"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >

      <div className="flex flex-col items-center justify-center mt-24 md:mt-32 lg:mt-40">
        <h2 className="font-extrabold text-[40px] md:text-[50px] text-center text-white flex flex-col gap-2">
          <span className="font-extrabold text-[#f56551] text-4xl md:text-5xl drop-shadow-lg">
            Discover Your Next Adventure with AI
          </span>
          <span className="font-bold text-[20px] md:text-[24px] text-black drop-shadow-lg">
            Trip planner with personalized itineraries, tickets, hotels, and much more
          </span>
          <p className="text-sm md:text-base text-gray-800 text-center mt-3 max-w-3xl mx-auto drop-shadow-lg">
            Your personal trip planner and curator, creating custom itineraries tailored to your interests, style, and budget.
          </p>
          <Link to="/create-trip" className="mt-6">
            <Button className="text-white bg-[#f56551] hover:bg-[#e53e3e] transition duration-300 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started for Free!
            </Button>
          </Link>
        </h2>
      </div>

      <img
        src="/landing2.png"
        alt="Travel illustration"
        className="rounded-2xl shadow-2xl mt-6 max-w-[90%] md:max-w-full"
      />
    </div>
  );
}

export default Hero;