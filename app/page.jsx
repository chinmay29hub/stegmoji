'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getHowToStructuredData, getFAQStructuredData } from '@/lib/seo/structuredData'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [visibleChars, setVisibleChars] = useState('')
  const [hiddenChars, setHiddenChars] = useState('')
  const [animationCycle, setAnimationCycle] = useState(0)
  
  // Continuous animated text effect for steganography theme
  useEffect(() => {
    const visibleText = "Hello World! 👋"
    const hiddenText = "🔒 Secret Message 🔒"
    
    const runAnimation = () => {
      setVisibleChars('')
      setHiddenChars('')
      
      let i = 0
      const interval = setInterval(() => {
        if (i < visibleText.length) {
          setVisibleChars(visibleText.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          // Start showing hidden characters
          setTimeout(() => {
            let j = 0
            const hiddenInterval = setInterval(() => {
              if (j < hiddenText.length) {
                setHiddenChars(hiddenText.slice(0, j + 1))
                j++
              } else {
                clearInterval(hiddenInterval)
                // Reset after showing for a while
                setTimeout(() => {
                  setAnimationCycle(prev => prev + 1)
                }, 2000)
              }
            }, 100)
          }, 1000)
        }
      }, 150)
    }
    
    runAnimation()
    
    // Restart animation every 8 seconds
    const restartInterval = setInterval(runAnimation, 8000)
    
    return () => {
      clearInterval(restartInterval)
    }
  }, [animationCycle])

  return (
    <>
      {/* Full-width animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Enhanced floating background elements */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-full blur-sm"
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 0.7, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-violet-600/30 rounded-full blur-sm"
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
            scale: [1, 2, 1],
            opacity: [0.5, 0.9, 0.5],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-10 h-10 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-sm"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 0.6, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-80 right-1/4 w-6 h-6 bg-gradient-to-br from-pink-400/30 to-rose-500/30 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            x: [0, 18, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-60 right-10 w-7 h-7 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-sm"
          animate={{
            y: [0, 22, 0],
            x: [0, -12, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, -120, -240, -360]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-1/3 w-5 h-5 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full blur-sm"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 60, 120, 180, 240, 300, 360]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-48 left-1/4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-blue-400/20"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rotate-45"
          animate={{
            y: [0, 18, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1],
            rotate: [45, 225, 405],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating lines/connections */}
        <motion.div
          className="absolute top-24 left-1/2 w-1 h-16 bg-gradient-to-b from-blue-400/20 to-transparent"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 right-1/2 w-20 h-1 bg-gradient-to-r from-purple-400/20 to-transparent"
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background patterns */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Floating dots pattern */}
          <motion.div
            className="absolute top-16 left-1/4 w-2 h-2 bg-blue-400/10 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-green-400/10 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-2.5 h-2.5 bg-purple-400/10 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Animated grid pattern */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Unicode symbols */}
          <motion.div
            className="absolute top-24 right-16 text-2xl opacity-20"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🔒
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-xl opacity-20"
            animate={{
              y: [0, 12, 0],
              rotate: [0, -15, 15, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            🔍
          </motion.div>
          <motion.div
            className="absolute top-40 left-1/2 text-lg opacity-20"
            animate={{
              y: [0, -8, 0],
              x: [0, 15, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚡
          </motion.div>
          
          {/* Floating text particles */}
          <motion.div
            className="absolute top-28 left-12 text-xs font-mono text-blue-400/20"
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            U+FE0E
          </motion.div>
          <motion.div
            className="absolute bottom-28 right-12 text-xs font-mono text-green-400/20"
            animate={{
              y: [0, 12, 0],
              x: [0, -10, 0],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, -8, 8, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            U+FE0F
          </motion.div>
          <motion.div
            className="absolute top-52 right-8 text-xs font-mono text-purple-400/20"
            animate={{
              y: [0, -8, 0],
              x: [0, 12, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 12, -12, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            VS15
          </motion.div>
          <motion.div
            className="absolute bottom-52 left-8 text-xs font-mono text-yellow-400/20"
            animate={{
              y: [0, 10, 0],
              x: [0, -8, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            VS16
          </motion.div>
        </motion.div>
        
        {/* Additional side animations for full width coverage */}
        <motion.div
          className="absolute top-32 left-4 w-6 h-6 bg-gradient-to-br from-teal-400/25 to-cyan-500/25 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            x: [0, 8, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-64 left-8 w-4 h-4 bg-gradient-to-br from-rose-400/25 to-pink-500/25 rounded-full blur-sm"
          animate={{
            y: [0, 15, 0],
            x: [0, -12, 0],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, -120, -240, -360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-48 left-6 w-5 h-5 bg-gradient-to-br from-amber-400/25 to-yellow-500/25 rounded-full blur-sm"
          animate={{
            y: [0, -18, 0],
            x: [0, 14, 0],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 60, 120, 180, 240, 300, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Right side animations */}
        <motion.div
          className="absolute top-48 right-4 w-7 h-7 bg-gradient-to-br from-violet-400/25 to-purple-500/25 rounded-full blur-sm"
          animate={{
            y: [0, 22, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-80 right-8 w-3 h-3 bg-gradient-to-br from-emerald-400/25 to-green-500/25 rounded-full blur-sm"
          animate={{
            y: [0, -16, 0],
            x: [0, 11, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-6 w-8 h-8 bg-gradient-to-br from-orange-400/25 to-red-500/25 rounded-full blur-sm"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.7, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Far left and right edge animations */}
        <motion.div
          className="absolute top-40 left-2 w-2 h-2 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-72 right-2 w-2 h-2 bg-green-400/20 rounded-full"
          animate={{
            y: [0, 14, 0],
            x: [0, -8, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1 w-1.5 h-1.5 bg-purple-400/20 rounded-full"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-72 right-1 w-1.5 h-1.5 bg-yellow-400/20 rounded-full"
          animate={{
            y: [0, 12, 0],
            x: [0, -6, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Animated Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Free Unicode Steganography Tool - Hide Messages in Plain Text
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hide secret messages inside text using invisible Unicode characters. Secure, private, and completely free.
          </motion.p>

          {/* Animated Demo Text */}
          <motion.div 
            className="mb-8 p-6 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {/* Floating particles background */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ 
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="text-sm text-muted-foreground mb-2 relative z-10">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Watch the magic happen:
              </motion.span>
            </div>
            <div className="text-lg font-mono relative z-10">
              <span className="text-foreground">{visibleChars}</span>
              <motion.span 
                className="text-primary ml-2"
                animate={{ 
                  opacity: hiddenChars ? [0, 1, 0.8, 1] : 0,
                  scale: hiddenChars ? [0.8, 1.1, 1] : 0.8
                }}
                transition={{ duration: 0.5 }}
              >
                {hiddenChars}
              </motion.span>
            </div>
            <motion.div 
              className="text-xs text-muted-foreground mt-2 relative z-10"
              animate={{ 
                opacity: hiddenChars ? [0, 1] : 0,
                y: hiddenChars ? [10, 0] : 10
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                ✨ Hidden message revealed! ✨
              </motion.span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/encode">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button size="lg" className="relative overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">Start Encoding</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/decode">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button variant="outline" size="lg">Decode Message</Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -3, 0],
              rotateX: [0, 1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 1.2 },
              x: { duration: 0.6, delay: 1.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
            className="transition-all duration-300"
          >
            <Card className="h-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <motion.span
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 },
                      scale: { duration: 1.5, repeat: Infinity, repeatDelay: 1 }
                    }}
                  >
                    🔍
                  </motion.span>
                  How Unicode Steganography Works
                </CardTitle>
                <CardDescription>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Advanced invisible character embedding technology
                  </motion.span>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.p 
                  className="text-sm text-muted-foreground"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Stegmoji uses Unicode Variation Selectors (VS15 and VS16) to embed hidden messages 
                  in plain text. These invisible characters don't change the visual appearance of text 
                  but can carry secret data. Our tool supports multiple embedding modes including 
                  Tail, Interleaved, and ZWJ-aware modes for maximum flexibility.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, 3, 0],
              rotateX: [0, -1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 1.4 },
              x: { duration: 0.6, delay: 1.4 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -8, scale: 1.03, rotateY: -5 }}
            className="transition-all duration-300"
          >
            <Card className="h-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity, repeatDelay: 2 },
                      rotate: { duration: 3, repeat: Infinity, repeatDelay: 1 }
                    }}
                  >
                    🛡️
                  </motion.span>
                  Privacy-First Design
                </CardTitle>
                <CardDescription>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Your secrets never leave your device
                  </motion.span>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.p 
                  className="text-sm text-muted-foreground"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  All processing happens locally in your browser using modern Web APIs. No data 
                  is sent to external servers, ensuring complete privacy. Features include AES-GCM 
                  encryption, DEFLATE compression, and real-time Unicode analysis.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Why Choose Stegmoji?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: [0, -2, 0],
                rotateX: [0, 0.5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ y: -12, scale: 1.05, rotateY: 8 }}
              className="transition-all duration-300"
            >
              <Card className="h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <motion.span
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, repeatDelay: 1 }
                      }}
                    >
                      🔒
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Secure
                    </motion.span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p 
                    className="text-sm text-muted-foreground"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    AES-GCM encryption with PBKDF2 key derivation ensures your messages are protected 
                    with industry-standard cryptography.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: [0, 2, 0],
                rotateX: [0, -0.5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 2.2 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ y: -12, scale: 1.05, rotateY: -8 }}
              className="transition-all duration-300"
            >
              <Card className="h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <motion.span
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        scale: { duration: 1.5, repeat: Infinity },
                        rotate: { duration: 2, repeat: Infinity, repeatDelay: 0.5 }
                      }}
                    >
                      ⚡
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      Fast
                    </motion.span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p 
                    className="text-sm text-muted-foreground"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    Real-time encoding and decoding with DEFLATE compression to maximize capacity 
                    in shorter texts.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: [0, -1, 0],
                rotateX: [0, 0.3, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 2.4 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ y: -12, scale: 1.05, rotateY: 8 }}
              className="transition-all duration-300"
            >
              <Card className="h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <motion.span
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, repeatDelay: 1 },
                        scale: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }
                      }}
                    >
                      🌐
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Compatible
                    </motion.span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p 
                    className="text-sm text-muted-foreground"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Works across all modern platforms including social media, email, and messaging 
                    applications that preserve Unicode characters.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, -2, 0], 
              rotateY: [0, 1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 2.8 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -15, scale: 1.08, rotateY: 8, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Link href="/encode">
              <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="text-center relative z-10">
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    🔐
                  </motion.div>
                  <CardTitle className="text-lg">Encode</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center relative z-10">
                  <p className="text-sm text-muted-foreground text-center">
                    Hide messages in cover text with optional compression and encryption
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, 2, 0], 
              rotateY: [0, -1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 3 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -15, scale: 1.08, rotateY: -8, rotateX: -5 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Link href="/decode">
              <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="text-center relative z-10">
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                  >
                    🔓
                  </motion.div>
                  <CardTitle className="text-lg">Decode</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center relative z-10">
                  <p className="text-sm text-muted-foreground text-center">
                    Extract hidden messages from encoded text
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, -1, 0], 
              rotateY: [0, 0.5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 3.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -15, scale: 1.08, rotateY: 8, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Link href="/scan">
              <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="text-center relative z-10">
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🔍
                  </motion.div>
                  <CardTitle className="text-lg">Scan</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center relative z-10">
                  <p className="text-sm text-muted-foreground text-center">
                    Analyze text for invisible characters and Unicode properties
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, 1, 0], 
              rotateY: [0, -0.5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 3.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ y: -15, scale: 1.08, rotateY: -8, rotateX: -5 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Link href="/about">
              <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="text-center relative z-10">
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    ℹ️
                  </motion.div>
                  <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center relative z-10">
                  <p className="text-sm text-muted-foreground text-center">
                    Learn about the technology and responsible usage
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
    </div>
    </>
  )
}
