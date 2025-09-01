'use client';

import React from 'react';
import Hyperspeed from '@/components/Home';

export default function Page() {
  const hyperspeedOptions = {
    length: 400,
    roadWidth: 10,
    islandWidth: 10,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    distortion: 'turbulentDistortion',
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    },
    onSpeedUp: (event: MouseEvent | TouchEvent) => {
      console.log('Speeding up!');
    },
    onSlowDown: (event: MouseEvent | TouchEvent) => {
      console.log('Slowing down!');
    }
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <Hyperspeed effectOptions={hyperspeedOptions} />

      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
        <p className="text-white/80 text-xl text-center max-w-md">
          Click and hold to accelerate through the digital highway
        </p>
      </div>
    
    </main>
  );
}