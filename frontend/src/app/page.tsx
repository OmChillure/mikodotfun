"use client"
import Hyperspeed from "@/components/Home"
import { WaitlistForm } from "@/components/waitlist-form"
import { useState } from "react"


export default function Page() {
  const [waitlistCount, setWaitlistCount] = useState<number>(0)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleWaitlistSuccess = (count: number) => {
    setWaitlistCount(count)
  }

  const hyperspeedOptions = {
    length: 400,
    roadWidth: 10,
    islandWidth: 10,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    distortion: "turbulentDistortion",
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
      sticks: 0x03b3c3,
    },
    onSpeedUp: (event: MouseEvent | TouchEvent) => {
      console.log("Speeding up!")
    },
    onSlowDown: (event: MouseEvent | TouchEvent) => {
      console.log("Slowing down!")
    },
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <Hyperspeed effectOptions={hyperspeedOptions} />

      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
        <div className="px-6">
          <div className="mx-auto max-w-xl font-sans flex flex-col items-center text-center gap-3">
            <h1 className="text-white text-3xl md:text-5xl font-semibold leading-tight text-balance">
              Secure, fast, and cross-chain by design
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed text-pretty">
              A secure ZK-powered on/off-ramp marketplace with vault protection, XP rewards, and cross-chain freedom.
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full pointer-events-auto mt-4 sm:mt-6">
          <WaitlistForm onSuccess={handleWaitlistSuccess} />
        </div>
      </div>
    </main>
  )
}