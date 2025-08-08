'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Loader2, Zap, Home, Gift, MessageCircle } from 'lucide-react'
import UnboxingSimulator from './components/unboxing-simulator'
import AnimatedRoast from './components/animated-roast'

export default function MottaPuffsPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [input, setInput] = useState('')
  const [roast, setRoast] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [floatingEggs, setFloatingEggs] = useState<Array<{id: number, x: number, y: number, rotation: number, scale: number}>>([])

  // Generate floating eggs
  useEffect(() => {
    const eggs = []
    for (let i = 0; i < 25; i++) {
      eggs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5
      })
    }
    setFloatingEggs(eggs)
  }, [])

  const generateRoast = async () => {
    if (!input.trim()) {
      setError('Oi! Enter something first, you coconut! 🥥')
      setTimeout(() => setError(''), 3000)
      return
    }

    setIsLoading(true)
    setError('')
    setRoast('')

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() })
      })

      if (!response.ok) {
        throw new Error('Roast machine broke!')
      }

      const data = await response.json()
      setRoast(data.roast)
    } catch (err) {
      const funnyErrors = [
        'This roast is still in the oven. Try again in 900 years! ⏰',
        'The puffs are too spicy for the AI to handle! 🌶️',
        'Tom P Lal accidentally unplugged the roast machine! 🔌',
        'Blesswin is too busy counting money to roast you right now! 💰',
        'The roast got stuck in traffic. Kerala roads, you know? 🚗'
      ]
      setError(funnyErrors[Math.floor(Math.random() * funnyErrors.length)])
      setTimeout(() => setError(''), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Floating Eggs Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingEggs.map((egg) => (
          <div
            key={egg.id}
            className="absolute animate-bounce opacity-20 hover:opacity-40 transition-opacity duration-300"
            style={{
              left: `${egg.x}%`,
              top: `${egg.y}%`,
              transform: `rotate(${egg.rotation}deg) scale(${egg.scale})`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="text-6xl md:text-8xl animate-pulse cursor-pointer hover:animate-spin transition-all duration-500">
              🥚
            </div>
          </div>
        ))}
      </div>

      {/* Glassmorphism Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-4 animate-bounce">
              🥚 MOTTA PUFFS 🥚
            </h1>
            <p className="text-xl md:text-2xl font-bold text-yellow-200 animate-pulse drop-shadow-lg">
              ✨ Kerala's Most Chaotic Egg Puff Universe! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Glassmorphism Tab Navigation */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-4 font-black text-lg border-b-4 transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'home'
                  ? 'border-yellow-400 text-yellow-300 bg-white/20 shadow-lg'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="inline mr-2" size={20} />
              🏠 HOME
            </button>
            <button
              onClick={() => setActiveTab('roast')}
              className={`px-6 py-4 font-black text-lg border-b-4 transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'roast'
                  ? 'border-red-400 text-red-300 bg-white/20 shadow-lg'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageCircle className="inline mr-2" size={20} />
              🔥 ROAST ME
            </button>
            <button
              onClick={() => setActiveTab('unboxing')}
              className={`px-6 py-4 font-black text-lg border-b-4 transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'unboxing'
                  ? 'border-green-400 text-green-300 bg-white/20 shadow-lg'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gift className="inline mr-2" size={20} />
              🎁 UNBOX FUN
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="max-w-6xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 transform hover:scale-105 transition-all duration-300">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 animate-pulse">
                  🎪 WELCOME TO THE CHAOS! 🎪
                </h2>
                <p className="text-xl text-yellow-200 mb-8 font-bold">
                  Choose your adventure in the wild world of Motta Puffs!
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Roast Generator Card */}
                  <Card 
                    className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-300/50 shadow-xl cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-300"
                    onClick={() => setActiveTab('roast')}
                  >
                    <div className="p-8 text-center">
                      <div className="text-6xl mb-4 animate-bounce">🔥</div>
                      <h3 className="text-2xl font-black text-white mb-4">AI ROAST GENERATOR</h3>
                      <p className="text-yellow-200 font-bold mb-4">
                        Get absolutely destroyed by our chaotic duo!
                      </p>
                      <div className="flex justify-center space-x-4 mb-4">
                        <div className="text-3xl animate-spin">🥚</div>
                        <div className="text-3xl animate-bounce">🥴</div>
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 font-black text-lg px-6 py-3 transform hover:scale-105">
                        START ROASTING! 🔥
                      </Button>
                    </div>
                  </Card>

                  {/* Unboxing Card */}
                  <Card 
                    className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border-2 border-green-300/50 shadow-xl cursor-pointer transform hover:scale-110 hover:-rotate-2 transition-all duration-300"
                    onClick={() => setActiveTab('unboxing')}
                  >
                    <div className="p-8 text-center">
                      <div className="text-6xl mb-4 animate-pulse">🎁</div>
                      <h3 className="text-2xl font-black text-white mb-4">VIRTUAL UNBOXING</h3>
                      <p className="text-yellow-200 font-bold mb-4">
                        Unwrap mystery boxes filled with... nothing!
                      </p>
                      <div className="flex justify-center space-x-2 mb-4">
                        <div className="text-2xl animate-bounce">🎉</div>
                        <div className="text-2xl animate-pulse">🎊</div>
                        <div className="text-2xl animate-bounce">🎈</div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 font-black text-lg px-6 py-3 transform hover:scale-105">
                        START UNBOXING! 🎁
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Character Showcase */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
              <div className="p-8">
                <h3 className="text-3xl font-black text-center mb-8 text-white animate-pulse">
                  🎭 MEET THE LEGENDS! 🎭
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="backdrop-blur-xl bg-blue-500/20 border-2 border-blue-300/50 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
                    <div className="p-6 text-center">
                      <div className="text-6xl mb-4 animate-bounce">🥚</div>
                      <h4 className="text-2xl font-black text-white mb-2">Blesswin Biju</h4>
                      <p className="text-blue-200 font-bold text-lg mb-3">CEO Motta Puffs</p>
                      <p className="text-white font-semibold">Sarcastic • Clever • Ruthless</p>
                      <div className="mt-4 text-yellow-200 font-bold animate-pulse">
                        "I'll roast you harder than our puffs!"
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="backdrop-blur-xl bg-purple-500/20 border-2 border-purple-300/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
                    <div className="p-6 text-center">
                      <div className="text-6xl mb-4 animate-spin">🥴</div>
                      <h4 className="text-2xl font-black text-white mb-2">Tom P Lal</h4>
                      <p className="text-purple-200 font-bold text-lg mb-3">Assistant Motta</p>
                      <p className="text-white font-semibold">Confused • Chaotic • Lovable</p>
                      <div className="mt-4 text-yellow-200 font-bold animate-pulse">
                        "Wait... what are we doing again?"
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ROAST TAB */}
        {activeTab === 'roast' && (
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8">
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-white mb-4 animate-bounce">
                    🔥 GET ABSOLUTELY DESTROYED! 🔥
                  </h2>
                  <p className="text-yellow-200 font-bold text-lg">
                    Enter your details and prepare for chaos!
                  </p>
                </div>
                
                <div className="space-y-6 max-w-2xl mx-auto">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your name, mood, or bio... we'll destroy it! 😈"
                    className="text-lg p-4 backdrop-blur-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/70 font-bold focus:border-yellow-400 focus:bg-white/30"
                    onKeyPress={(e) => e.key === 'Enter' && generateRoast()}
                  />
                  
                  <Button
                    onClick={generateRoast}
                    disabled={isLoading}
                    className="w-full text-xl font-black py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 border-2 border-yellow-400 shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        🔥 ROASTING IN PROGRESS... 🔥
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-6 w-6" />
                        🔥 DESTROY ME NOW! 🔥
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Error Display */}
            {error && (
              <Card className="max-w-2xl mx-auto mb-8 backdrop-blur-xl bg-red-500/30 border-2 border-red-300/50 animate-shake">
                <div className="p-4 text-center">
                  <p className="text-white font-black text-lg">❌ {error}</p>
                </div>
              </Card>
            )}

            {/* Animated Roast Display */}
            {roast && <AnimatedRoast roast={roast} onClear={() => setRoast('')} />}
          </div>
        )}

        {/* UNBOXING TAB */}
        {activeTab === 'unboxing' && (
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-white mb-4 animate-bounce">
                    🎁 VIRTUAL UNBOXING EXTRAVAGANZA! 🎁
                  </h2>
                  <p className="text-yellow-200 font-bold text-lg">
                    Click through the mystery box and discover... absolutely nothing! 🎉
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <UnboxingSimulator />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Glassmorphism Footer */}
      <footer className="relative z-10 backdrop-blur-xl bg-white/10 border-t border-white/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-xl font-black text-white mb-2 animate-pulse">
              🥚 CEO Motta Puffs = Blesswin Biju | Assistant Motta = Tom P Lal 🥴
            </p>
            <p className="text-yellow-200 font-bold">
              ✨ Powered by Chaos, Kerala Spices & Pure Madness ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
