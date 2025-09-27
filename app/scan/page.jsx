'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { analyzeInvisibleChars, getCodepointBreakdown, getGraphemeClusters, checkNormalization } from '@/lib/unicode'
import { scanText } from '@/lib/steganography'
import SEOHead from '@/components/seo/SEOHead'

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

  const handleExample = () => {
    setInputText('Hello 👋 world! This is a test with some emoji 🎉 and special characters.')
  }

  return (
    <>
      <SEOHead 
        title="Unicode Scanner - Analyze Text for Hidden Characters and Steganography"
        description="Analyze text for invisible Unicode characters, steganography, and hidden data. Free online Unicode text analyzer with detailed character breakdown and normalization analysis."
        keywords="unicode scanner, text analyzer, invisible characters, unicode analysis, steganography detection, hidden characters, text forensics"
        canonical="https://chinmay29hub-stegmoji.vercel.app/scan"
      />
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Unicode Scanner</h1>
          <p className="text-muted-foreground">
            Analyze text for invisible characters, Unicode properties, and potential steganography
          </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
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
              <div className="mt-2 flex space-x-2">
                <Button onClick={handleExample} variant="outline" size="sm">
                  Load Example
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
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
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
        </div>
      </div>
    </div>
    </>
  )
}
