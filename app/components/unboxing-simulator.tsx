'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function UnboxingSimulator() {
  const [step, setStep] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [confetti, setConfetti] = useState<Array<{id: number, color: string, left: number, delay: number}>>([])
  const [currentComment, setCurrentComment] = useState("🎁 Ready for the most epic unboxing adventure ever!")

  const celebrationComments = [
    "🎊 WOOHOO! Epic unboxing in progress!",
    "🎉 AMAZING! The excitement is building!",
    "🥳 PARTY MODE! This is getting intense!",
    "🎈 CELEBRATION TIME! Almost there!",
    "🎪 WINNER ENERGY! You're doing great!",
    "🎭 DRAMATIC MOMENT! The suspense is real!",
    "🎨 HISTORIC UNBOXING! Making memories!",
    "🎯 EXPERT LEVEL! Professional technique!",
    "🌟 SUPERSTAR MOVES! Absolutely brilliant!",
    "🎵 VICTORY VIBES! Keep going champion!"
  ]

  const tomStupidComments = [
    "🥴 CONGRATULATIONS! You successfully wasted 3 clicks!",
    "🥴 ACHIEVEMENT UNLOCKED: Professional Time Waster Level 1!",
    "🥴 WOW! You clicked a box! I'm so proud of my teaching skills!",
    "🥴 BREAKING NEWS: Local person discovers how to use a mouse!",
    "🥴 INCREDIBLE! You have mastered the ancient art of clicking!",
    "🥴 GENIUS MOVE! You opened an empty box like a true champion!",
    "🥴 AMAZING! You just experienced premium digital disappointment!",
    "🥴 SUCCESS! You've officially confused me more than usual!",
    "🥴 BRILLIANT! You clicked faster than I can burn puffs!",
    "🥴 LEGENDARY! You're now qualified to work at our confusion department!",
    "🥴 OUTSTANDING! You've wasted time more efficiently than me!",
    "🥴 SPECTACULAR! You opened nothing with maximum effort!",
    "🥴 INCREDIBLE! You've achieved peak virtual box opening skills!",
    "🥴 MARVELOUS! You clicked a thing and things happened!",
    "🥴 FANTASTIC! You're almost as confused as I am daily!",
    "🥴 WONDERFUL! You've mastered the art of digital emptiness!",
    "🥴 SUPERB! You clicked better than I cook puffs!",
    "🥴 EXCELLENT! You've successfully done... something... I think?",
    "🥴 PERFECT! You're now certified in professional box bothering!",
    "🥴 MAGNIFICENT! You've unlocked the mystery of wasted electricity!",
    "🥴 GLORIOUS! You clicked with the power of a confused assistant!",
    "🥴 STUPENDOUS! You've achieved maximum clickage with minimum brain!",
    "🥴 REMARKABLE! You opened a box faster than I lose ingredients!",
    "🥴 PHENOMENAL! You've mastered advanced finger pressing techniques!",
    "🥴 EXTRAORDINARY! You're now an expert in digital disappointment!"
  ]

  const stepComments = {
    0: "🎁 Ready for the most epic unboxing adventure ever!",
    1: "🎬 TAPE REMOVED! Now for the wrapping paper magic!",
    2: "🎭 UNWRAPPED! Time for the grand finale - open that lid!",
    3: tomStupidComments[Math.floor(Math.random() * tomStupidComments.length)]
  }

  const launchConfetti = () => {
    const newConfetti = []
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: Date.now() + i,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'][Math.floor(Math.random() * 7)],
        left: Math.random() * 100,
        delay: Math.random() * 1000
      })
    }
    setConfetti(newConfetti)
    setTimeout(() => {
      setConfetti([])
    }, 4000)
  }

  const handleClick = () => {
    if (step === 0) {
      setStep(1)
      setCurrentComment(stepComments[1])
    } else if (step === 1) {
      setStep(2)
      setCurrentComment(stepComments[2])
    } else if (step === 2) {
      setStep(3)
      // Get a random Tom comment for completion
      const randomTomComment = tomStupidComments[Math.floor(Math.random() * tomStupidComments.length)]
      setCurrentComment(randomTomComment)
      launchConfetti()
      setTimeout(() => setShowMessage(true), 1200)
    }
  }

  const restart = () => {
    setStep(0)
    setShowMessage(false)
    setConfetti([])
    // Change comment to a new random celebration comment
    const randomComment = celebrationComments[Math.floor(Math.random() * celebrationComments.length)]
    setCurrentComment(randomComment)
    // After a brief moment, reset to the starting comment
    setTimeout(() => {
      setCurrentComment(stepComments[0])
    }, 2000)
  }

  return (
    <div className="relative flex flex-col items-center min-h-[600px] w-full max-w-4xl mx-auto">
      {/* Permanent Celebration Comments - Positioned at Top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md">
        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-yellow-300/50 rounded-lg px-6 py-3 text-center shadow-2xl">
          <div className="text-lg font-black text-yellow-100 animate-pulse drop-shadow-lg">
            {currentComment}
          </div>
        </div>
      </div>

      {/* Enhanced Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-4 h-4 animate-bounce z-10"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
            top: '80px',
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${piece.delay}ms`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Enhanced Box Container - Positioned in Center */}
      <div 
        className="absolute top-24 left-1/2 transform -translate-x-1/2 w-72 h-56 cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-1"
        onClick={handleClick}
      >
        {/* Box Base with Glassmorphism */}
        <div className="absolute bottom-0 w-full h-full backdrop-blur-xl bg-gradient-to-b from-amber-400/30 to-amber-600/50 border-2 border-amber-300/50 rounded-lg shadow-2xl" />
        
        {/* Enhanced Wrapping Paper */}
        <div 
          className={`absolute top-0 w-full h-full backdrop-blur-sm bg-gradient-to-br from-red-400/40 to-pink-600/60 transition-all duration-800 rounded-lg border border-red-300/50 ${
            step >= 2 ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'
          }`}
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.3) 15px, rgba(220, 38, 38, 0.3) 15px, rgba(220, 38, 38, 0.3) 30px)'
          }}
        />
        
        {/* Enhanced Tape */}
        <div 
          className={`absolute left-1/2 top-0 w-16 h-full backdrop-blur-sm bg-gradient-to-r from-yellow-300/60 to-yellow-500/80 transform -translate-x-1/2 transition-all duration-1000 z-10 border border-yellow-400/50 rounded ${
            step >= 1 ? 'translate-y-[-280px] rotate-45 scale-75' : 'translate-y-0 rotate-0 scale-100'
          }`}
        />
        
        {/* Enhanced Lid */}
        <div 
          className={`absolute top-0 w-full h-20 backdrop-blur-xl bg-gradient-to-b from-amber-300/40 to-amber-500/60 border-b-2 border-amber-400/50 transition-all duration-1000 origin-bottom z-20 rounded-t-lg ${
            step >= 3 ? 'transform -rotate-x-130' : 'transform rotate-x-0'
          }`}
          style={{
            transform: step >= 3 ? 'rotateX(-130deg)' : 'rotateX(0deg)'
          }}
        />

        {/* Enhanced Click Instructions */}
        {step < 3 && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-white/20 text-white font-black text-sm px-4 py-2 rounded-full border border-white/30 animate-pulse">
            👆 {step === 0 ? '🎬 REMOVE TAPE!' : step === 1 ? '🎭 UNWRAP IT!' : '🎪 OPEN THE LID!'}
          </div>
        )}
      </div>

      {/* Simple Celebration Display - Moved Up */}
      {showMessage && (
        <div className="absolute top-[350px] left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-300/50 rounded-xl p-4 shadow-2xl max-w-md w-full mx-4 text-center animate-fadeIn hover:scale-105 transition-all duration-300">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          
          {/* Just decorative elements */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-4xl animate-spin">🎊</div>
            <div className="text-4xl animate-bounce">🎈</div>
            <div className="text-4xl animate-pulse">✨</div>
          </div>
          
          <Button
            onClick={restart}
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 font-black text-lg px-6 py-3 transform hover:scale-105 transition-all duration-200 border-2 border-yellow-300/50"
          >
            🔄 UNBOX AGAIN! 🎁
          </Button>
        </div>
      )}

      {/* Fixed Instructions - Positioned at Bottom with Proper Layout */}
      {step === 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center max-w-sm">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg px-6 py-4 shadow-xl">
            <p className="text-yellow-200 text-lg font-black mb-2 animate-pulse">
              🎁 What's inside the mystery Motta Puff box?
            </p>
            <p className="text-white/80 text-sm font-semibold">
              Click to start the most epic unboxing experience ever!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
