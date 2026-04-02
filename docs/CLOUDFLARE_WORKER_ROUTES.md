# Cloudflare Worker Routes Setup

This guide explains how to set up path-based routing using Cloudflare Workers.

---

## Goal

Route requests from your main domain to separate Cloudflare Pages projects:

```
vian-project.pages.dev/
├── /dashboard      → mono-repo-dashboard.pages.dev
├── /landing        → mono-repo-landing.pages.dev
└── /game-2048      → mono-repo-game2048.pages.dev
```

---

## Method 1: Using Cloudflare Dashboard (Recommended)

### Step 1: Create the Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **"Create application"** → **"Create Worker"**
4. Name it: `mono-repo-routes`
5. Click **"Deploy"**

### Step 2: Edit Worker Code

1. Click on your new Worker
2. Click **"Quick edit"**
3. Replace the code with:

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // Route mappings
    const routes = {
      '/landing': 'https://mono-repo-landing.pages.dev',
      '/landing-page': 'https://mono-repo-landing.pages.dev',
      '/dashboard': 'https://mono-repo-dashboard.pages.dev',
      '/game': 'https://mono-repo-game2048.pages.dev',
      '/game-2048': 'https://mono-repo-game2048.pages.dev',
    }

    // Check exact path match
    let targetUrl = routes[path]

    // Check prefix match (for subpaths like /dashboard/something)
    if (!targetUrl) {
      for (const [route, destination] of Object.entries(routes)) {
        if (path.startsWith(route + '/')) {
          targetUrl = destination
          break
        }
      }
    }

    // Default to home
    if (!targetUrl) {
      targetUrl = 'https://vian-project.pages.dev'
    }

    // Proxy to target
    const target = new URL(targetUrl)
    target.pathname = path
    target.search = url.search

    return fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
  },
}
```

4. Click **"Save and Deploy"**

### Step 3: Add Routes to Worker

1. In your Worker, go to **Triggers** → **Routes**
2. Click **"Add route"**
3. Add route: `vian-project.pages.dev/*`
4. Click **"Save"**

---

## Method 2: Using Custom Domain

If you have a custom domain (e.g., `yourname.com`):

### Step 1: Add Custom Domain to Main Project

1. In **vian-project** Pages project → **Custom domains**
2. Add `yourname.com`

### Step 2: Create Worker with Custom Domain Routes

1. Create Worker (see Method 1)
2. In Worker → **Triggers** → **Routes**
3. Add routes:
   - `yourname.com/dashboard/*` → Worker
   - `yourname.com/landing/*` → Worker
   - `yourname.com/game-2048/*` → Worker

### Step 3: Update DNS (if needed)

Cloudflare will provide DNS records to add.

---

## Method 3: Using Single Domain Routes (Advanced)

For more complex routing, update the Worker to handle everything:

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // If accessing worker directly (e.g., mono-repo-routes.your-subdomain.workers.dev)
    // Redirect to main domain
    if (url.hostname.includes('workers.dev')) {
      return Response.redirect('https://vian-project.pages.dev' + url.pathname, 301)
    }

    const path = url.pathname
    const hostname = url.hostname

    // Route mappings
    const routes = {
      '/landing': 'https://mono-repo-landing.pages.dev',
      '/landing-page': 'https://mono-repo-landing.pages.dev',
      '/dashboard': 'https://mono-repo-dashboard.pages.dev',
      '/game': 'https://mono-repo-game2048.pages.dev',
      '/game-2048': 'https://mono-repo-game2048.pages.dev',
    }

    // Find matching route
    let targetUrl = routes[path]
    if (!targetUrl) {
      for (const [route, destination] of Object.entries(routes)) {
        if (path.startsWith(route + '/')) {
          targetUrl = destination
          break
        }
      }
    }

    // Default to home
    if (!targetUrl) {
      targetUrl = 'https://vian-project.pages.dev'
    }

    // Proxy request
    const target = new URL(targetUrl)
    target.pathname = path
    target.search = url.search

    return fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
  },
}
```

---

## Testing

After deployment, test these URLs:

```
✅ vian-project.pages.dev/              → Home
✅ vian-project.pages.dev/dashboard     → Dashboard (proxied)
✅ vian-project.pages.dev/landing       → Landing (proxied)
✅ vian-project.pages.dev/game-2048     → Game (proxied)
```

---

## Environment Variables (Optional)

Store URLs in environment variables for easier updates:

```javascript
export default {
  async fetch(request, env, ctx) {
    const routes = {
      '/landing': env.LANDING_URL || 'https://mono-repo-landing.pages.dev',
      '/dashboard': env.DASHBOARD_URL || 'https://mono-repo-dashboard.pages.dev',
      '/game-2048': env.GAME_URL || 'https://mono-repo-game2048.pages.dev',
    }
    // ...
  }
}
```

---

## Troubleshooting

### 404 on proxied routes

- Check that the target URLs are correct
- Verify the target Cloudflare Pages projects are deployed
- Check Worker logs for errors

### CORS errors

- May need to add CORS headers in the Worker
- Or ensure all apps are on the same domain

### Assets not loading

- Make sure relative paths are preserved
- Check that `target.pathname = path` is set correctly

---

## Route Reference

| Path | Proxies To |
|------|------------|
| `/` | Home (vian-project.pages.dev) |
| `/landing` | mono-repo-landing.pages.dev |
| `/dashboard` | mono-repo-dashboard.pages.dev |
| `/game-2048` | mono-repo-game2048.pages.dev |
| `/dashboard/*` | mono-repo-dashboard.pages.dev/* |
