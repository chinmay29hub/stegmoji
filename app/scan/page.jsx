'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { analyzeInvisibleChars, getCodepointBreakdown, getGraphemeClusters, checkNormalization } from '@/lib/unicode'
import { scanText } from '@/lib/steganography'

export default function ScanPage() {
  const [inputText, setInputText] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  // Analyze the input text
  const analysis = useMemo(() => {
    if (!inputText.trim()) return null

    const invisibleAnalysis = analyzeInvisibleChars(inputText)
    const steganographyScan = scanText(inputText)
    const codepointBreakdown = getCodepointBreakdown(inputText)
    const graphemeClusters = getGraphemeClusters(inputText)
    const normalization = checkNormalization(inputText)

    return {
      invisibleAnalysis,
      steganographyScan,
      codepointBreakdown,
      graphemeClusters,
      normalization
    }
  }, [inputText])

  const handleClear = () => {
    setInputText('')
    setShowDetails(false)
  }

  const handleNormalExample = () => {
    setInputText('Hello 👋 world! This is a test with some emoji 🎉 and special characters.')
  }

  const handleEncodedExample = () => {
    // This is a real encoded message with hidden data
    setInputText('Hello world! This is a normal looking message that actually contains hidden steganographic data encoded using Unicode variation selectors.︎︎︎︎︎︎︎︎︎️︎️︎️︎︎︎️️︎️︎︎︎︎️️︎️︎︎️︎️️️︎︎️️︎︎️︎︎︎︎︎︎️️︎️︎︎️︎️️️︎︎️️︎︎️︎︎︎︎︎︎️️︎︎︎︎️︎︎️︎︎︎︎︎︎️️️︎︎️️︎️️︎︎️︎️︎️️︎︎︎️️︎️️️︎︎️︎︎️️︎︎️︎️︎️️️︎️︎︎︎︎️︎︎︎︎︎︎️️︎️️︎️︎️️︎︎️︎️︎️️️︎︎️️︎️️️︎︎️️︎️️︎︎︎︎️︎️️︎︎️️️︎️️︎︎️︎️')
  }

  const handleTailExample = () => {
    // Tail mode - all variation selectors at the end
    setInputText('Hello world! This is a normal looking message that actually contains hidden steganographic data encoded using Unicode variation selectors.︎︎︎︎︎︎︎︎︎️︎️︎️︎︎︎️️︎️︎︎︎︎️️︎️︎︎️︎️️️︎︎️️︎︎️︎︎︎︎︎︎️️︎️︎︎️︎️️️︎︎️️︎︎️︎︎︎︎︎︎️️︎︎︎︎️︎︎️︎︎︎︎︎︎️️️︎︎️️︎️️︎︎️︎️︎️️︎︎︎️️︎️️️︎︎️︎︎️️︎︎️︎️︎️️️︎️︎︎︎︎️︎︎︎︎︎︎️️︎️️︎️︎️️︎︎️︎️︎️️️︎️︎️︎️️️︎️︎️️︎️️︎︎︎︎️︎️️︎︎️️️︎️️︎︎️︎️')
  }

  const handleInterleavedExample = () => {
    // Interleaved mode - variation selectors between codepoints (after every character including spaces)
    setInputText('H︎e︎l︎l︎o︎ ︎w︎o︎r︎l︎d︎!︎ ︎T︎h︎i︎s︎ ︎i︎s︎ ︎a︎ ︎t︎e︎s︎t︎ ︎m︎e︎s︎s︎a︎g︎e︎ ︎w︎i︎t︎h︎ ︎h︎i︎d︎d︎e︎n︎ ︎d︎a︎t︎a︎.')
  }

  const handleZWJExample = () => {
    // ZWJ-aware mode - variation selectors between grapheme clusters (preserves emoji as single units)
    // This example uses complex emoji sequences to show the difference
    // In ZWJ-aware mode, 👨‍👩‍👧‍👦 is treated as ONE grapheme cluster, not individual codepoints
    setInputText('H︎e︎l︎l︎o︎ ︎👨‍👩‍👧‍👦︎ ︎t︎h︎i︎s︎ ︎i︎s︎ ︎a︎ ︎t︎e︎s︎t︎ ︎w︎i︎t︎h︎ ︎👩‍💻︎ ︎c︎o︎m︎p︎l︎e︎x︎ ︎e︎m︎o︎j︎i︎ ︎👨‍👩‍👧‍👦︎ ︎s︎e︎q︎u︎e︎n︎c︎e︎s︎.')
  }

  return (
    <>
      {/* Scanning-themed animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating scanning symbols */}
        <motion.div
          className="absolute top-20 left-16 text-4xl opacity-10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          🔬
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-3xl opacity-10"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -25, 25, 0],
            opacity: [0.05, 0.18, 0.05]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          🔍
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-2xl opacity-10"
          animate={{
            y: [0, -35, 0],
            x: [0, 30, 0],
            rotate: [0, 30, -30, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          📊
        </motion.div>
        
        {/* Floating scanning-related text */}
        <motion.div
          className="absolute top-32 left-1/3 text-xs font-mono text-indigo-400/20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 12, -12, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          SCAN
        </motion.div>
        <motion.div
          className="absolute top-60 right-1/3 text-xs font-mono text-teal-400/20"
          animate={{
            y: [0, 25, 0],
            x: [0, -18, 0],
            opacity: [0.1, 0.35, 0.1],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          ANALYZE
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-xs font-mono text-emerald-400/20"
          animate={{
            y: [0, -25, 0],
            x: [0, 25, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 18, -18, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          DETECT
        </motion.div>
        
        {/* Floating geometric shapes for scanning theme */}
        <motion.div
          className="absolute top-24 left-12 w-12 h-12 bg-gradient-to-br from-indigo-400/15 to-purple-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-48 right-12 w-8 h-8 bg-gradient-to-br from-teal-400/15 to-cyan-500/15 rounded-full blur-sm"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-48 left-16 w-11 h-11 bg-gradient-to-br from-emerald-400/15 to-green-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -40, 0],
            x: [0, 35, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 72, 144, 216, 288, 360]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating scanning grid patterns */}
        <motion.div
          className="absolute top-36 left-8 w-8 h-8 border border-indigo-400/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-36 right-8 w-6 h-6 border border-teal-400/20"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -45, -90, -135, -180, -225, -270, -315, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated connection lines */}
        <motion.div
          className="absolute top-28 left-1/2 w-1 h-24 bg-gradient-to-b from-indigo-400/20 to-transparent"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-28 right-1/2 w-28 h-1 bg-gradient-to-r from-teal-400/20 to-transparent"
          animate={{
            scaleX: [1, 1.4, 1],
            opacity: [0.1, 0.5, 0.1],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating dots pattern */}
        <motion.div
          className="absolute top-16 left-1/4 w-2 h-2 bg-indigo-400/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-teal-400/10 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 w-2.5 h-2.5 bg-emerald-400/10 rounded-full"
          animate={{
            y: [0, -35, 0],
            x: [0, 30, 0],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Unicode Scanner</h1>
          <p className="text-muted-foreground">
            Analyze text for invisible characters, Unicode properties, and potential steganography
          </p>
        </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Text to Analyze</CardTitle>
              <CardDescription>
                Paste or type text to analyze for Unicode properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to analyze..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px]"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <Button onClick={handleNormalExample} variant="outline" size="sm">
                  Normal Text
                </Button>
                <Button onClick={handleTailExample} variant="outline" size="sm">
                  Tail Mode
                </Button>
                <Button onClick={handleInterleavedExample} variant="outline" size="sm">
                  Interleaved
                </Button>
                <Button onClick={handleZWJExample} variant="outline" size="sm">
                  ZWJ-Aware
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total characters:</span>
                  <span>{inputText.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grapheme clusters:</span>
                  <span>{analysis.graphemeClusters.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Invisible characters:</span>
                  <span className={analysis.invisibleAnalysis.invisibleCount > 0 ? 'text-orange-600' : ''}>
                    {analysis.invisibleAnalysis.invisibleCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Invisible ratio:</span>
                  <span className={analysis.invisibleAnalysis.invisibleRatio > 0.1 ? 'text-orange-600' : ''}>
                    {(analysis.invisibleAnalysis.invisibleRatio * 100).toFixed(1)}%
                  </span>
                </div>
                {analysis.steganographyScan.hasHiddenData && (
                  <div className="flex justify-between text-green-600">
                    <span>Potential steganography:</span>
                    <span>✅ {analysis.steganographyScan.vsCount} VS found</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Analysis Results */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {analysis ? (
            <>
              {/* Invisible Characters */}
              <Card>
                <CardHeader>
                  <CardTitle>Invisible Characters</CardTitle>
                  <CardDescription>
                    Analysis of zero-width and invisible Unicode characters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis.invisibleAnalysis.invisibleChars.length > 0 ? (
                    <div className="space-y-2">
                      {analysis.invisibleAnalysis.invisibleChars.map((char, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-mono text-sm">{char.name}</span>
                          <span className="text-sm font-medium">{char.count}</span>
                        </div>
                      ))}
                      {analysis.invisibleAnalysis.invisibleRatio > 0.1 && (
                        <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded text-sm">
                          ⚠️ High invisible character ratio detected. This may indicate steganography or unusual text formatting.
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No invisible characters found</p>
                  )}
                </CardContent>
              </Card>

              {/* Steganography Detection */}
              {analysis.steganographyScan.hasHiddenData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Steganography Detection</CardTitle>
                    <CardDescription>
                      Potential hidden data found in the text
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Variation Selectors found:</span>
                        <span className="font-mono">{analysis.steganographyScan.vsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated bits:</span>
                        <span className="font-mono">{analysis.steganographyScan.estimatedBits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated bytes:</span>
                        <span className="font-mono">{analysis.steganographyScan.estimatedBytes}</span>
                      </div>
                      
                      {/* Mode Detection */}
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
                        <div className="font-medium mb-1">🔍 Embedding Mode Detection:</div>
                        <div className="text-xs space-y-1">
                          {(() => {
                            const vsPositions = []
                            for (let i = 0; i < inputText.length; i++) {
                              if (inputText[i] === '\uFE0E' || inputText[i] === '\uFE0F') {
                                vsPositions.push(i)
                              }
                            }
                            
                            if (vsPositions.length === 0) return null
                            
                            const lastCharIndex = inputText.length - 1
                            const allAtEnd = vsPositions.every(pos => pos > lastCharIndex - vsPositions.length)
                            
                            if (allAtEnd) {
                              return <div>✅ <strong>Tail Mode</strong> - All variation selectors at the end</div>
                            } else {
                              // Try to distinguish between Interleaved and ZWJ-aware
                              const codepointCount = Array.from(inputText).length
                              const graphemeCount = analysis.graphemeClusters.length
                              
                              // Calculate the ratio of VS to original characters
                              const originalTextLength = inputText.length - vsPositions.length
                              const vsRatio = vsPositions.length / originalTextLength
                              
                              let modeHint = "Interleaved/ZWJ-aware Mode"
                              
                              // More sophisticated detection based on VS pattern analysis
                              // Check if VS are distributed more evenly (Interleaved) vs clustered (ZWJ-aware)
                              const vsGaps = []
                              for (let i = 1; i < vsPositions.length; i++) {
                                vsGaps.push(vsPositions[i] - vsPositions[i-1])
                              }
                              const avgGap = vsGaps.length > 0 ? vsGaps.reduce((a, b) => a + b, 0) / vsGaps.length : 0
                              const gapVariance = vsGaps.length > 0 ? vsGaps.reduce((sum, gap) => sum + Math.pow(gap - avgGap, 2), 0) / vsGaps.length : 0
                              
                              // Interleaved mode has more consistent gaps (VS after every character)
                              // ZWJ-aware mode has more variable gaps (VS after grapheme clusters)
                              if (gapVariance < 2 && vsRatio > 0.7) {
                                modeHint = "Likely Interleaved Mode (consistent VS pattern)"
                              } else if (codepointCount !== graphemeCount && gapVariance > 1) {
                                modeHint = "Likely ZWJ-aware Mode (variable VS pattern with complex Unicode)"
                              } else if (vsRatio > 0.8) {
                                modeHint = "Likely Interleaved Mode (high VS density)"
                              } else {
                                modeHint = "Likely ZWJ-aware Mode (preserves grapheme clusters)"
                              }
                              
                              return (
                                <div>
                                  ✅ <strong>{modeHint}</strong> - Variation selectors distributed throughout
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Codepoints: {codepointCount}, Grapheme clusters: {graphemeCount}, VS ratio: {(vsRatio * 100).toFixed(1)}%, Gap variance: {gapVariance.toFixed(2)}
                                  </div>
                                </div>
                              )
                            }
                          })()}
                        </div>
                      </div>
                      
                      <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-sm">
                        ✅ This text likely contains hidden data. Try decoding it!
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Grapheme Clusters */}
              <Card>
                <CardHeader>
                  <CardTitle>Grapheme Clusters</CardTitle>
                  <CardDescription>
                    Text split into Unicode grapheme clusters (visual characters)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm space-y-1">
                    {analysis.graphemeClusters.map((cluster, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-muted-foreground text-xs w-8">{index + 1}</span>
                        <span className="bg-muted px-2 py-1 rounded">{cluster}</span>
                        <span className="text-xs text-muted-foreground">
                          ({cluster.length} chars)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Normalization Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Normalization Analysis</CardTitle>
                  <CardDescription>
                    How the text changes under different Unicode normalization forms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">NFC (Canonical Composition)</Label>
                    <div className="mt-1 p-2 bg-muted rounded font-mono text-sm">
                      {analysis.normalization.nfc}
                    </div>
                    {analysis.normalization.nfcChanged && (
                      <div className="mt-1 text-sm text-orange-600">
                        ⚠️ Text changed under NFC normalization
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">NFKC (Canonical Decomposition + Compatibility)</Label>
                    <div className="mt-1 p-2 bg-muted rounded font-mono text-sm">
                      {analysis.normalization.nfkc}
                    </div>
                    {analysis.normalization.nfkcChanged && (
                      <div className="mt-1 text-sm text-orange-600">
                        ⚠️ Text changed under NFKC normalization (invisible chars may be removed)
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <strong>Warning:</strong> Some platforms may normalize text automatically, 
                    which could remove invisible characters used for steganography.
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Codepoint Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Codepoint Analysis</CardTitle>
                  <CardDescription>
                    Detailed breakdown of each Unicode codepoint in the text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {analysis.codepointBreakdown.map((cp, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-2 rounded text-sm ${
                          cp.isInvisible ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-muted'
                        }`}
                      >
                        <span className="font-mono">{cp.hex}</span>
                        <span className="text-xs">{cp.name}</span>
                        {cp.isInvisible && <span className="text-orange-600">⚠️</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Enter text above to see analysis results</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
    </>
  )
}
