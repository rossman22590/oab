# Clerk + Convex Authentication Setup

## Problem
You're seeing this error:
```
Failed to get Clerk token: Error: Not Found
clerkError: true, status: 404
```

This means the Clerk Convex JWT template is not configured.

## Why This Matters
- **Without auth**: All workflows are public/shared - no user isolation
- **With auth**: Each user only sees their own workflows securely

## Quick Fix (5 minutes)

### Step 1: Configure Clerk JWT Template

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application: **square-llama-50**
3. Go to: **Configure → JWT Templates**
4. Click **+ New Template**
5. Choose **Convex** from the templates list
6. Name it: `convex`
7. Set the **Issuer** to: `https://square-llama-50.clerk.accounts.dev`
8. Click **Save**

### Step 2: Verify Environment Variables

Make sure these are in your `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3F1YXJlLWxsYW1hLTUwLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_otBZy09vZWR0szxQG5fMXtOaHPIEYvG4AiYkrRcANe

# Clerk + Convex Integration
CLERK_JWT_ISSUER_DOMAIN=https://square-llama-50.clerk.accounts.dev

# Convex
NEXT_PUBLIC_CONVEX_URL=https://insightful-narwhal-410.convex.cloud
```

### Step 3: Set Convex Environment Variable

Run this command to configure Convex to accept Clerk tokens:

```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://square-llama-50.clerk.accounts.dev"
```

### Step 4: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## How to Test

1. Create a workflow while signed in
2. Sign out
3. Sign in with a different account
4. You should NOT see the first account's workflows
5. Each user sees only their own workflows

## Current Behavior (Without Auth)

Right now:
- ✅ App works but workflows aren't user-specific
- ⚠️ You'll see 0 workflows in "Your Workflows" tab (because there are no workflows without a userId)
- ✅ Templates work fine

After setup:
- ✅ Each user has their own private workflows
- ✅ Workflows are properly associated with user accounts
- ✅ Users can't see each other's workflows

## Documentation

- [Clerk + Convex Guide](https://clerk.com/docs/integrations/databases/convex)
- [Convex Auth Docs](https://docs.convex.dev/auth/clerk)
