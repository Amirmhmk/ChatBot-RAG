'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'

export default function ResourceCreator() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/embedding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (response.ok) {
        setText('') // Clear the input after successful submission
      } else {
        throw new Error(data.error || 'Error')
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-right"> Build Resource</CardTitle>
          <CardDescription className="text-right">Enter Information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Write your texts"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="min-h-[200px] text-right"
              dir="rtl"
            />
            <Button type="submit" className="w-full text-lg" disabled={isLoading}>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}