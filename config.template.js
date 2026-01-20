// ============================================
// CONFIGURATION TEMPLATE
// ============================================
// This file is a template. The actual values will be injected during deployment.
// For local development, copy this to config.js and add your actual keys.

const SUPABASE_URL = '${SUPABASE_URL}';
const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';

// Gemini AI Configuration
const GEMINI_API_KEY = '${GEMINI_API_KEY}';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get patient ID from URL
function getPatientId() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get('id');

    const pathParts = window.location.pathname.split('/');
    const pathId = pathParts[pathParts.length - 1].replace('.html', '');

    return queryId || (pathId !== 'patient-profile' && pathId !== 'index' ? pathId : null);
}
