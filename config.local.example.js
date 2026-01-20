// ============================================
// LOCAL DEVELOPMENT CONFIGURATION EXAMPLE
// ============================================
// Copy this file to config.js and add your actual API keys for local development
// DO NOT commit config.js to the repository!

const SUPABASE_URL = 'https://edwuptavjdakjuqyrxaf.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key-here';

// Gemini AI Configuration
const GEMINI_API_KEY = 'your-gemini-api-key-here';
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
