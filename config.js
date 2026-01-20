

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
