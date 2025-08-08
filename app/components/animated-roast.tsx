'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface AnimatedRoastProps {
  roast: string
  onClear: () => void
}

export default function AnimatedRoast({ roast, onClear }: AnimatedRoastProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showClearButton, setShowClearButton] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState<'blesswin' | 'tom' | null>(null)

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setShowClearButton(false)
    setCurrentSpeaker(null)
  }, [roast])

  useEffect(() => {
    if (currentIndex < roast.length) {
      const timer = setTimeout(() => {
        const newChar = roast[currentIndex]
        setDisplayedText(prev => prev + newChar)
        setCurrentIndex(prev => prev + 1)

        // Detect speaker changes for animations
        if (roast.substring(currentIndex, currentIndex + 12) === '🥚 Blesswin:') {
          setCurrentSpeaker('blesswin')
        } else if (roast.substring(currentIndex, currentIndex + 8) === '🥴 Tom:') {
          setCurrentSpeaker('tom')
        }
      }, 30) // Typing speed

      return () => clearTimeout(timer)
    } else {
      // Animation complete
      setTimeout(() => setShowClearButton(true), 500)
    }
  }, [currentIndex, roast])

  const lines = displayedText.split('\n').filter(line => line.trim())

  return (
    <Card className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-fadeIn">
      <div className="p-6 md:p-8">
        <h3 className="text-3xl font-black text-center mb-6 text-yellow-200 animate-pulse">
          🎭 THE ROAST MASTERS UNLEASHED! 🎭
        </h3>
        
        <div className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-lg p-6 min-h-[200px]">
          <div className="space-y-4">
            {lines.map((line, index) => {
              const isBlesswin = line.includes('🥚 Blesswin:')
              const isTom = line.includes('🥴 Tom:')
              
              return (
                <div
                  key={index}
                  className={`flex ${isBlesswin ? 'justify-start' : isTom ? 'justify-end' : 'justify-center'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg font-bold text-lg leading-relaxed transform transition-all duration-500 ${
                      isBlesswin
                        ? 'bg-blue-500/30 border-2 border-blue-300/50 text-blue-100 animate-slideInLeft hover:scale-105'
                        : isTom
                        ? 'bg-purple-500/30 border-2 border-purple-300/50 text-purple-100 animate-slideInRight hover:scale-105'
                        : 'bg-white/20 border border-white/30 text-white'
                    }`}
                  >
                    {isBlesswin && (
                      <div className="flex items-center mb-2">
                        <div className="text-2xl mr-2 animate-bounce">🥚</div>
                        <div className="font-black text-blue-200">CEO Blesswin</div>
                      </div>
                    )}
                    {isTom && (
                      <div className="flex items-center mb-2">
                        <div className="text-2xl mr-2 animate-spin">🥴</div>
                        <div className="font-black text-purple-200">Assistant Tom</div>
                      </div>
                    )}
                    <div className={`${isBlesswin || isTom ? 'ml-8' : ''}`}>
                      {line.replace(/🥚 Blesswin:|🥴 Tom:/, '').trim()}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* Typing indicator */}
            {currentIndex < roast.length && (
              <div className="flex justify-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {showClearButton && (
          <div className="mt-6 text-center animate-fadeIn">
            <Button
              onClick={onClear}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-black text-lg px-8 py-3 transform hover:scale-105 transition-all duration-200"
            >
              🗑️ Clear This Epic Roast!
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
