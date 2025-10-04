# Security Note

**IMPORTANT:** Never commit API keys to git!

## Protected Files

All API keys are stored in `.env.local` which is in `.gitignore`.

## If You Accidentally Expose Keys

1. **Immediately rotate the keys** (get new ones)
2. **Revoke old keys** on the provider's dashboard
3. **Remove from git history:**
   ```bash
   # Remove file from git history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch <FILE_WITH_KEY>" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push
   git push origin --force --all
   ```

## Current API Keys

**DO NOT commit these anywhere:**

- `EDEN_API_KEY` - Eden video/audio generation
- `EDEN_AGENT_ID` - Eden agent identifier
- `DOME_API_KEY` - Dome prediction market data
- `SUPABASE_URL` - Database URL
- `SUPABASE_ANON_KEY` - Database access
- `SUPABASE_SERVICE_KEY` - Admin database access

## Safe Practices

✅ **DO:**
- Store keys in `.env.local`
- Use `process.env.KEY_NAME` in code
- Add `.env.local` to `.gitignore`
- Use example files like `.env.example` (without real values)

❌ **DON'T:**
- Hardcode keys in source files
- Commit `.env.local` to git
- Share keys in documentation
- Put keys in example code
- Store keys in test files

## Checking for Exposed Keys

```bash
# Search for potential exposed keys
grep -r "API_KEY\|SECRET\|PASSWORD" --exclude-dir=node_modules --exclude-dir=.git --exclude=".env.local" .
```

---

**Last security audit:** October 3, 2025
**Status:** Keys removed from documentation, hardcoded defaults removed from code
