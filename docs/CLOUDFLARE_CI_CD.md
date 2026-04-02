# Cloudflare Pages CI/CD Setup

This repository uses GitHub Actions to automatically deploy only the projects that have changed to Cloudflare Pages.

---

## How It Works

The deployment workflow automatically detects which apps have changed and only builds and deploys those specific apps:

- ✅ **Changed file in `apps/home/`** → Only home app deploys
- ✅ **Changed file in `apps/dashboard/`** → Only dashboard app deploys
- ✅ **Changed file in `apps/landing-page/`** → Only landing-page app deploys
- ✅ **Changed file in `apps/game-2048/`** → Only game-2048 app deploys
- ✅ **Changed file in `packages/ui/`** → All dependent apps redeploy
- ✅ **Changed file in `packages/projects/`** → Only apps that use it redeploy

---

## Setup Instructions

### Step 1: Get Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Use **"Edit Cloudflare Workers"** template or create custom token with:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Zone** → **Zone** → **Read** (optional, for custom domains)
   - **Account Resources** → Include → Your account
4. Copy the API token

### Step 2: Get Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages**
3. Your Account ID is in the right sidebar or URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/pages/view`

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Your API token from Step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Account ID from Step 2 |

### Step 4: Configure Project Names

Make sure your Cloudflare Pages projects are named correctly:

| App | Project Name in Cloudflare |
|-----|---------------------------|
| Home | `vian-project` |
| Dashboard | `mono-repo-dashboard` |
| Landing Page | `mono-repo-landing` |
| Game 2048 | `mono-repo-game2048` |

If your projects have different names, update the workflow file:
`.github/workflows/deploy.yml`

---

## Deployment Workflow

### Automatic Deployment

Every push to `main` branch triggers the workflow:

```
git push origin main
```

The workflow will:
1. ✅ Detect which files changed
2. ✅ Build only the affected apps
3. ✅ Deploy to Cloudflare Pages
4. ✅ Skip apps that didn't change

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **"Deploy to Cloudflare Pages"** workflow
3. Click **"Run workflow"**
4. Select branch and click **"Run workflow"**

---

## Project Dependencies

### Shared Packages

When you change shared packages, dependent apps automatically redeploy:

| Package | Dependent Apps |
|---------|----------------|
| `packages/ui/` | home, dashboard, landing-page, game-2048 |
| `packages/projects/` | home |
| `packages/utils/` | home, dashboard, landing-page, game-2048 |

### Example Scenarios

**Scenario 1: Update home page only**
```
✅ Changed: apps/home/src/app/page.tsx
✅ Deploys: Only home app
⏭️  Skips: dashboard, landing-page, game-2048
```

**Scenario 2: Update shared UI component**
```
✅ Changed: packages/ui/src/button.tsx
✅ Deploys: home, dashboard, landing-page, game-2048
```

**Scenario 3: Update landing page**
```
✅ Changed: apps/landing-page/src/App.tsx
✅ Deploys: Only landing-page app
⏭️  Skips: home, dashboard, game-2048
```

---

## Troubleshooting

### Workflow fails with "Authentication error"

- Check that `CLOUDFLARE_API_TOKEN` secret is correct
- Verify token has **Cloudflare Pages: Edit** permission
- Ensure token hasn't expired

### Workflow fails with "Project not found"

- Check project name in workflow matches Cloudflare Pages project name
- Verify project exists in your Cloudflare account

### App doesn't update after push

- Check workflow logs in **Actions** tab
- Verify the changed files match the path filters
- Ensure you pushed to `main` branch

### Multiple apps deploying when only one changed

- Check if shared packages were modified
- Review path filters in workflow file

---

## Local Deployment

You can still deploy locally:

```bash
# Deploy home app
cd apps/home
npm run deploy

# Deploy dashboard app
cd apps/dashboard
npm run deploy

# Deploy landing-page app
cd apps/landing-page
npm run build
npx wrangler pages deploy dist --project-name=mono-repo-landing

# Deploy game-2048 app
cd apps/game-2048
npm run build
npx wrangler pages deploy dist --project-name=mono-repo-game2048
```

---

## Workflow Status Badge

Add this to your README to show deployment status:

```markdown
[![Deploy to Cloudflare Pages](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml)
```

---

## Advanced Configuration

### Deploy to Preview Branches

To deploy preview branches for pull requests, add to the workflow:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

And modify deploy commands to include branch names:

```yaml
command: pages deploy .vercel/output/static --project-name=vian-project --branch=${{ github.head_ref }}
```

### Environment Variables

Add environment variables to your deploy commands:

```yaml
- name: Deploy to Cloudflare Pages
  env:
    NODE_ENV: production
  run: wrangler pages deploy .vercel/output/static --project-name=vian-project
```

---

## Related Documentation

- [Cloudflare Pages Deployment](./CLOUDFLARE_DEPLOYMENT.md)
- [Project Structure](./README.md)
- [Shared Packages](./SHARED_PACKAGES.md)
