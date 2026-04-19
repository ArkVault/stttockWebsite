#!/bin/bash
set -e
cd /vercel/share/v0-project

git add middleware.ts
git commit -m "fix: inline middleware logic to fix edge function unsupported module error

Remove import of @/lib/supabase/middleware and inline all session/auth
logic directly into middleware.ts. The separate module import was causing
Vercel's edge bundler to fail with unsupported_modules. @supabase/ssr is
edge-compatible when used directly; the issue was the indirect import chain.
Also fixes /crm/login exclusion logic so login page itself is not redirected.

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>"

git push origin HEAD
