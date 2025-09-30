# Project Blueprint: The Wolf AI

## Overview

The Wolf AI is a Next.js application designed to provide a sleek and interactive user experience. It integrates with Supabase for database management, Solana for blockchain interactions, and OpenAI for AI-powered features.

## Design and Features

### Landing Page (`src/app/page.tsx`)

*   **Visuals:**
    *   Dark theme with a black background and white text.
    *   Custom font: 'Inter'.
    *   Animated wolf image (`/TheWolf.webp`) that fades in and scales up.
    *   Animated, gradient text for the main heading "THE WOLF AI".
    *   Interactive cursor effect with a blurred cyan circle following the mouse.
    *   Paw print images (`/pawprint.png`) that fade out at the cursor's previous locations.
*   **Interactivity:**
    *   "Sign In" and "Dashboard" buttons with hover effects.
*   **Performance:**
    *   Images are optimized using the Next.js `<Image>` component for faster loading times.
*   **SEO:**
    *   The page has a descriptive title and meta description to improve search engine visibility.
*   **Accessibility:**
    *   Decorative elements (cursor and paw prints) are hidden from screen readers to avoid confusion.

### Backend and Services

*   **AI API (`src/app/api/wolf/route.ts`):**
    *   A simple API route that takes a message and uses the OpenAI API (gpt-4o-mini) to generate a response.
*   **Supabase (`src/lib/supabase.ts`):**
    *   Initializes and exports a Supabase client for database interactions.
*   **Solana (`src/lib/solana.ts`):**
    *   Initializes and exports connections to Solana's mainnet, devnet, and testnet.

## Environment Variables (`.env`)

*   `NEXT_PUBLIC_SUPABASE_URL`: The URL for the Supabase project.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for the Supabase project.
*   `OPENAI_API_KEY`: The API key for OpenAI.
*   `NEXT_PUBLIC_SOLANA_MAINNET`: The RPC URL for Solana's mainnet.
*   `NEXT_PUBLIC_SOLANA_DEVNET`: The RPC URL for Solana's devnet.
*   `NEXT_PUBLIC_SOLANA_TESTNET`: The RPC URL for Solana's testnet.
