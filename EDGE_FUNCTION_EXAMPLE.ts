// Supabase Edge Function for AI Health Predictions
// Deploy this to: supabase/functions/generate-health-predictions/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')!
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

serve(async (req) => {
    try {
        const { patientData, lifestyleData, mentalHealthScores, documents } = await req.json()

        // Build patient profile
        const profile = buildPatientProfile(patientData, lifestyleData, mentalHealthScores, documents)

        // Create AI prompt
        const prompt = createHealthAnalysisPrompt(profile)

        // Call Gemini AI
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        })

        const data = await response.json()
        const aiResponse = data.candidates[0].content.parts[0].text

        // Parse and return predictions
        const predictions = parseAIPredictions(aiResponse)

        return new Response(JSON.stringify(predictions), {
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
})

// Helper functions (same as in ai-prediction.js)
function buildPatientProfile(patientData, lifestyleData, mentalHealthScores, documents) {
    // ... implementation
}

function createHealthAnalysisPrompt(profile) {
    // ... implementation
}

function parseAIPredictions(aiResponse) {
    // ... implementation
}
