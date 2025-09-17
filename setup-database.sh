#!/bin/bash

# MIYOMI Database Setup Script
echo "🚀 MIYOMI Database Setup"
echo "=========================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
if ! command_exists npx; then
    echo "❌ Error: Node.js/npm not found. Please install Node.js first."
    exit 1
fi

if ! command_exists vercel; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📋 MANUAL STEPS REQUIRED:"
echo "========================="
echo ""
echo "🔸 STEP 1: Create Supabase Project (2 minutes)"
echo "   1. Go to: https://supabase.com"
echo "   2. Click 'Start your project'"
echo "   3. Sign up with GitHub/Google"
echo "   4. Click 'New Project'"
echo "   5. Choose organization and fill:"
echo "      - Name: miyomi-database"
echo "      - Database Password: [generate strong password]"
echo "      - Region: [choose closest to you]"
echo "   6. Click 'Create new project'"
echo "   7. Wait 2-3 minutes for setup"
echo ""

echo "🔸 STEP 2: Setup Database Schema"
echo "   1. In Supabase dashboard, click 'SQL Editor' (left sidebar)"
echo "   2. Click 'New query'"
echo "   3. Copy ALL text from this file:"
echo "      /Users/seth/miyomi-vercel/database/schema.sql"
echo "   4. Paste into SQL editor"
echo "   5. Click 'RUN' button"
echo "   6. Verify you see: 'Success. No rows returned.'"
echo ""

echo "🔸 STEP 3: Get Database Credentials"
echo "   1. In Supabase, go to Settings > API (left sidebar)"
echo "   2. Copy these values:"
echo "      - Project URL (starts with https://...supabase.co)"
echo "      - anon public key (starts with eyJ...)"
echo ""

echo "🔸 STEP 4: Automatic Environment Setup"
echo "   Once you have the credentials above, I'll set them up..."
echo ""

# Function to set up Vercel environment variables
setup_vercel_env() {
    echo "🔧 Setting up Vercel environment variables..."
    
    read -p "Enter your Supabase URL: " SUPABASE_URL
    read -p "Enter your Supabase anon key: " SUPABASE_ANON_KEY
    
    if [[ -z "$SUPABASE_URL" || -z "$SUPABASE_ANON_KEY" ]]; then
        echo "❌ Error: Both URL and key are required"
        return 1
    fi
    
    echo "Adding SUPABASE_URL to Vercel..."
    echo "$SUPABASE_URL" | npx vercel env add SUPABASE_URL production
    
    echo "Adding SUPABASE_ANON_KEY to Vercel..."
    echo "$SUPABASE_ANON_KEY" | npx vercel env add SUPABASE_ANON_KEY production
    
    echo "✅ Environment variables added to Vercel!"
    
    # Deploy with new env vars
    echo "🚀 Deploying with database integration..."
    EDEN_API_KEY=db10962875d98d2a2dafa8599a89c850766f39647095c002 npx vercel --prod
    
    return 0
}

# Ask if user wants to continue with env setup
echo "❓ Have you completed steps 1-3 above? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    setup_vercel_env
else
    echo ""
    echo "📝 Next Steps:"
    echo "============="
    echo "1. Complete the manual steps above"
    echo "2. Run this script again: ./setup-database.sh"
    echo "3. Or manually run:"
    echo "   npx vercel env add SUPABASE_URL production"
    echo "   npx vercel env add SUPABASE_ANON_KEY production"
    echo ""
fi

echo ""
echo "🧪 Testing Commands:"
echo "==================="
echo "After setup, test these URLs:"
echo "• Database health: https://miyomi-federation-1t5eb4w01-edenprojects.vercel.app/api/database-health"
echo "• Video history: https://miyomi-federation-1t5eb4w01-edenprojects.vercel.app/api/video-history"
echo "• Generate video: Use the main interface to create a video"
echo ""
echo "🎯 Success Indicators:"
echo "• Database health shows 'healthy: true'"
echo "• Video generation saves to database"
echo "• Video history persists between refreshes"
echo ""