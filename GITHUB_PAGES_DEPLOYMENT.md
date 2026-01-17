# GitHub Pages Deployment Guide for QR Profile

## 🚀 Deploying to GitHub Pages with Secure API Keys

Since `config.js` is gitignored (contains your API keys), you need to use **GitHub Secrets** to inject the keys during deployment.

## Setup Steps

### 1. Add Secrets to GitHub Repository

Go to your GitHub repository:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

```
Name: SUPABASE_URL
Value: https://edwuptavjdakjuqyrxaf.supabase.co

Name: SUPABASE_ANON_KEY
Value: sb_publishable_cHYdCX_v8CTBV0VlqaaAwQ_GR-17x_Y

Name: GEMINI_API_KEY
Value: AIzaSyBTXTtt1YBvrd8dqqHPq2tEF8Ry2Dy4dRE
```

### 2. GitHub Actions Workflow

The workflow file `.github/workflows/deploy-qr-profile.yml` will:
1. ✅ Checkout your code
2. ✅ Generate `config.js` from GitHub Secrets
3. ✅ Deploy to GitHub Pages

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

### 4. Push to GitHub

```bash
git add .github/workflows/deploy-qr-profile.yml
git add qr/.gitignore
git add qr/config.example.js
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

The workflow will automatically run and deploy your QR profile!

## 🌐 Access Your Deployed Site

After deployment, your site will be available at:
```
https://<your-username>.github.io/<repo-name>/index.html?id=<patient_id>
```

## 🔒 Security Notes

✅ **API keys are secure** - stored in GitHub Secrets, not in code  
✅ **config.js is generated** during build, never committed  
✅ **Only you can see secrets** - team members with repo access can't see them  

## Alternative: Netlify/Vercel

If you prefer, you can also deploy to:
- **Netlify**: Set environment variables in Netlify dashboard
- **Vercel**: Set environment variables in Vercel dashboard

Both support environment variables and are easier to set up than GitHub Pages.

## 📝 Important

⚠️ **Client-side API keys are still visible** in the browser. For production, consider:
1. Using Supabase Edge Functions (Option 2 from earlier)
2. Implementing proper API key rotation
3. Setting up rate limiting on your Gemini API key
