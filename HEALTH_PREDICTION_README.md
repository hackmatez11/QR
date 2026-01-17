# AI-Powered Health Prediction System

## Overview

This system uses **Gemini AI** to analyze comprehensive patient data and generate personalized health predictions, risk assessments, and medical test recommendations.

## Features

### 🤖 AI-Powered Analysis
- Analyzes patient demographics, medical history, lifestyle data, mental health scores, and uploaded documents
- Generates personalized health risk predictions
- Recommends medical tests based on age, conditions, and risk factors
- Provides actionable health recommendations

### 📊 Comprehensive Data Sources
1. **Demographics**: Age, BMI, blood group, gender
2. **Medical History**: Diseases, allergies, medications, surgeries
3. **Lifestyle Metrics**: Sleep, activity, hydration, nutrition (30-day averages)
4. **Mental Health**: Mood stability, stress resilience, burnout risk, cognitive fatigue
5. **Medical Documents**: Lab reports, prescriptions, X-rays, MRI scans

### 🎯 Prediction Categories
- **Cardiovascular Disease Risk**
- **Type 2 Diabetes Risk**
- **Mental Health Concerns**
- **Sleep Disorders**
- **Nutritional Deficiencies**

## Setup Instructions

### 1. Database Setup

Run the migration script in Supabase SQL Editor:

```bash
# Navigate to Supabase migrations folder
cd d:\Health\Healthcare\supabase\migrations

# Run the migration
# Copy contents of 007_health_prediction_schema.sql and execute in Supabase SQL Editor
```

This creates:
- `health_predictions` table
- `medical_test_recommendations` table
- `health_risk_assessments` table
- `prediction_rules` table
- Helper functions for risk calculations

### 2. Verify Gemini API Key

The Gemini API key is already configured in the system:
- Location: `d:\Health\qr\ai-prediction.js`
- Current key: `AIzaSyBTXTtt1YBvrd8dqqHPq2tEF8Ry2Dy4dRE`

### 3. Access the QR Profile Page

Open the patient profile with a patient ID:

```
d:\Health\qr\index.html?id=<patient_id>
```

Replace `<patient_id>` with an actual patient UUID from your database.

## How It Works

### Data Flow

1. **Page Load**: Patient data, lifestyle metrics, mental health scores, and documents are fetched from Supabase
2. **AI Analysis**: All data is sent to Gemini AI with a structured prompt
3. **Prediction Generation**: AI analyzes the data and returns:
   - Health risk predictions with risk scores (0-100)
   - Recommended medical tests with priority levels
   - Risk assessments for major health categories
   - Personalized recommendations
4. **Display**: Results are rendered in a beautiful, color-coded UI

### AI Prompt Structure

The system sends a comprehensive prompt to Gemini including:
- Patient demographics and medical history
- 30-day lifestyle averages
- Mental health scores
- List of uploaded medical documents
- Request for structured JSON output

### Fallback Mechanism

If AI analysis fails:
- System falls back to rule-based predictions
- Uses predefined algorithms for cardiovascular and diabetes risk
- Generates age-based test recommendations
- Ensures the system always provides value

## UI Components

### Health Predictions Section

Located between Medical History and Mental Health Analytics:

1. **AI Summary**: Brief overall health assessment
2. **Identified Health Risks**: Cards showing predicted conditions with risk levels
3. **Risk Assessment Dashboard**: Visual gauges for major risk categories
4. **Recommended Medical Tests**: Prioritized list of suggested tests

### Risk Levels

- 🟢 **Low** (0-24): Minimal risk
- 🟡 **Moderate** (25-49): Some attention needed
- 🟠 **High** (50-74): Significant risk, action recommended
- 🔴 **Critical** (75-100): Urgent attention required

### Priority Levels for Tests

- 🔴 **Urgent**: Immediate action required
- 🟠 **High**: Schedule soon
- 🔵 **Medium**: Routine screening
- ⚪ **Low**: Optional/preventive

## File Structure

```
d:\Health\qr\
├── index.html                    # Main HTML file (updated with new scripts)
├── config.js                     # Supabase configuration
├── components.js                 # UI components (updated with prediction components)
├── api.js                        # Data fetching functions
├── prediction.js                 # Prediction API functions (NEW)
├── health-prediction.js          # Rule-based prediction algorithms (NEW)
├── ai-prediction.js              # AI-powered prediction engine (NEW)
├── prediction-renderer.js        # Prediction UI rendering (NEW)
├── main.js                       # Main rendering logic (updated)
├── mental-health.js              # Mental health rendering
├── lifestyle.js                  # Lifestyle rendering
└── documents.js                  # Document rendering
```

## Testing

### Manual Testing Steps

1. **Open Patient Profile**:
   ```
   d:\Health\qr\index.html?id=<patient_id>
   ```

2. **Verify Loading State**:
   - Check that "Analyzing Your Health Data" appears initially

3. **Check AI Predictions**:
   - Verify predictions section loads after a few seconds
   - Check that risk scores are displayed
   - Verify color-coding matches risk levels

4. **Test Different Patients**:
   - Test with patients of different ages
   - Test with patients having different medical conditions
   - Test with patients having lifestyle data vs. no lifestyle data

5. **Browser Console**:
   - Open Developer Tools (F12)
   - Check for any JavaScript errors
   - Verify AI API calls are successful

### Expected Behavior

✅ **Success Indicators**:
- Predictions section loads within 5-10 seconds
- Risk scores are between 0-100
- Recommendations are specific and actionable
- UI is responsive and visually consistent
- No console errors

❌ **Failure Indicators**:
- Error message displayed in predictions section
- Console shows API errors
- Predictions don't load after 30 seconds

## Troubleshooting

### Issue: Predictions Not Loading

**Possible Causes**:
1. Gemini API key invalid or quota exceeded
2. Patient has no data (empty profile)
3. Network connectivity issues

**Solutions**:
1. Check browser console for error messages
2. Verify Gemini API key is valid
3. Test with a patient that has complete data
4. System will fallback to rule-based predictions if AI fails

### Issue: Incorrect Risk Scores

**Possible Causes**:
1. AI misinterpreting data
2. Incomplete patient data
3. Prompt needs refinement

**Solutions**:
1. Review patient data for accuracy
2. Check AI response in console logs
3. Adjust prompt in `ai-prediction.js` if needed

### Issue: Database Errors

**Possible Causes**:
1. Migration not run
2. RLS policies blocking access
3. Table structure mismatch

**Solutions**:
1. Run migration script in Supabase
2. Check RLS policies in Supabase dashboard
3. Verify table structure matches schema

## Customization

### Adjusting AI Prompt

Edit `d:\Health\qr\ai-prediction.js` function `createHealthAnalysisPrompt()`:
- Modify the prompt structure
- Add/remove data sections
- Adjust output format requirements

### Changing Risk Thresholds

Edit `d:\Health\qr\health-prediction.js`:
- Modify risk calculation algorithms
- Adjust score thresholds
- Add new risk factors

### UI Styling

Edit `d:\Health\qr\components.js`:
- Modify `RiskGauge()` for different visualizations
- Update `PredictionCard()` styling
- Customize color schemes

## Security & Privacy

⚠️ **Important Considerations**:

1. **Data Privacy**: Patient data is sent to Gemini AI for analysis
2. **API Key**: Keep Gemini API key secure
3. **HIPAA Compliance**: Ensure compliance with healthcare regulations
4. **Disclaimers**: Always include medical disclaimers in UI

## Future Enhancements

Potential improvements:
- [ ] Store predictions in database for historical tracking
- [ ] Add trend analysis over time
- [ ] Integrate with wearable devices for real-time data
- [ ] Add more specialized risk assessments
- [ ] Implement doctor review workflow
- [ ] Add patient notification system for high-risk predictions

## Support

For issues or questions:
1. Check browser console for errors
2. Review this README
3. Check Supabase logs
4. Verify Gemini API status

---

**Disclaimer**: This system is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment.
