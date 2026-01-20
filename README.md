# QR Patient Profile - Modular Structure

## 🚀 Deployment & Setup

### For Local Development

1. Copy the example config file:
   ```bash
   cp config.local.example.js config.js
   ```

2. Edit `config.js` and add your actual API keys:
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `GEMINI_API_KEY`: Your Google Gemini API key

3. Open `index.html` in your browser or use a local server

### For GitHub Pages Deployment

This repository uses **GitHub Actions** to automatically deploy to GitHub Pages with secure environment variables.

#### Setting up GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following secrets:

   - **Name**: `SUPABASE_URL`  
     **Value**: `https://edwuptavjdakjuqyrxaf.supabase.co`

   - **Name**: `SUPABASE_ANON_KEY`  
     **Value**: Your Supabase anonymous key

   - **Name**: `GEMINI_API_KEY`  
     **Value**: Your Google Gemini API key

4. The workflow will automatically run on every push to `main` branch

#### Enabling GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

Your site will be available at: `https://hackmatez11.github.io/QR/`

### 🔒 Important Security Notes

- **Never commit `config.js`** - it's in `.gitignore` for a reason
- The `config.template.js` file contains placeholders that get replaced during deployment
- GitHub Secrets are encrypted and only accessible during workflow runs
- Consider adding API key restrictions in Google Cloud Console:
  - Restrict Gemini API key to your GitHub Pages domain: `https://hackmatez11.github.io`

### Configuration Files Overview

- `config.template.js` - Template with placeholders (committed to repo)
- `config.local.example.js` - Example for local development (committed to repo)
- `config.js` - Actual config with real keys (NOT committed, in .gitignore)
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## Overview

The QR patient profile has been refactored into a modular structure for better maintainability and organization. The page now displays comprehensive patient information including:

- Basic patient information
- Medical history
- **Lifestyle analytics** (NEW)
- Mental health analytics
- Medical documents

## File Structure

```
qr/
├── index.html              # Main HTML file (simplified)
├── index.html.backup       # Backup of original file
├── config.js               # Configuration and Supabase setup
├── components.js           # Reusable UI components
├── api.js                  # Data fetching functions
├── mental-health.js        # Mental health analytics rendering
├── lifestyle.js            # Lifestyle analytics rendering (NEW)
├── documents.js            # Medical documents rendering
└── main.js                 # Main rendering logic and orchestration
```

## Module Descriptions

### index.html
- Minimal HTML structure
- Loads all JavaScript modules
- Contains only styles and app container

### config.js
- Supabase configuration
- Client initialization
- Utility functions (getPatientId)

### components.js
- UI component functions (InfoCard, showLoading, showError)
- Icon definitions
- Utility functions (formatFileSize, getFileIcon, etc.)

### api.js
- `fetchPatientData()` - Get patient basic information
- `fetchPatientDocuments()` - Get medical documents
- `fetchMentalHealthScores()` - Get mental health analytics
- `fetchLifestyleData()` - Get lifestyle tracking data (NEW)

### mental-health.js
- `interpretScore()` - Interpret mental health scores
- `getRecommendations()` - Generate personalized recommendations
- `renderMentalHealthAnalytics()` - Render mental health section

### lifestyle.js (NEW)
- `renderLifestyleAnalytics()` - Render lifestyle tracking section
- Displays weekly averages for:
  - Sleep duration
  - Step count
  - Hydration levels
  - Calorie intake
- Shows active goals with progress
- Provides health summary

### documents.js
- `renderDocuments()` - Render medical documents section
- Handles document display, preview, and download

### main.js
- `renderPatient()` - Main rendering function
- `loadPatientData()` - Orchestrates data fetching
- Coordinates all modules

## New Features

### Lifestyle Analytics

The QR profile now displays lifestyle tracking data from the main application:

**Metrics Displayed:**
- 🌙 Average Sleep (last 7 days)
- 👟 Average Steps (last 7 days)
- 💧 Hydration Levels (last 7 days)
- 🍽️ Average Calories (last 7 days)

**Additional Information:**
- Active lifestyle goals with progress bars
- Health summary with recommendations
- Visual progress indicators
- Color-coded metrics

**Data Source:**
- Fetches from `lifestyle_sleep_entries`
- Fetches from `lifestyle_activity_entries`
- Fetches from `lifestyle_hydration_entries`
- Fetches from `lifestyle_nutrition_entries`
- Fetches from `lifestyle_goals`

## Usage

### Accessing the Profile

```
http://your-domain/qr/index.html?id=PATIENT_ID
```

or

```
http://your-domain/qr/PATIENT_ID.html
```

### Development

To modify a specific section:

1. **Update Configuration**: Edit `config.js`
2. **Add New Components**: Add to `components.js`
3. **Add Data Fetching**: Add to `api.js`
4. **Update Rendering**: Modify relevant rendering file

### Adding New Sections

1. Create a new `.js` file (e.g., `new-section.js`)
2. Add rendering function
3. Import in `index.html`
4. Call from `main.js` in `renderPatient()`

## Benefits of Modular Structure

✅ **Maintainability**: Each module has a single responsibility  
✅ **Scalability**: Easy to add new sections  
✅ **Readability**: Code is organized and easy to navigate  
✅ **Debugging**: Easier to isolate and fix issues  
✅ **Collaboration**: Multiple developers can work on different modules  
✅ **Reusability**: Components can be reused across sections  

## Database Requirements

The lifestyle analytics require the following tables:
- `lifestyle_sleep_entries`
- `lifestyle_activity_entries`
- `lifestyle_hydration_entries`
- `lifestyle_nutrition_entries`
- `lifestyle_goals`

Ensure these tables are created using the migration script in `Healthcare/database/lifestyle_schema.sql`.

## Troubleshooting

**Issue**: Lifestyle data not showing  
**Solution**: Ensure the lifestyle database tables are created and the user has logged lifestyle data

**Issue**: "No patient ID provided"  
**Solution**: Make sure the URL includes the patient ID parameter

**Issue**: Module not loading  
**Solution**: Check browser console for errors and verify all `.js` files are in the `qr` folder

## Future Enhancements

Potential additions:
- Medication schedule display
- Appointment history
- Lab results visualization
- Health trends over time
- Export functionality
- Print-friendly view

---

**Note**: The original monolithic `index.html` has been backed up as `index.html.backup` for reference.
