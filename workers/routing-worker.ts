// Cloudflare Worker for path-based routing
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // Define route mappings
    const routes = {
      '/landing': 'https://mono-repo-landing.pages.dev',
      '/landing-page': 'https://mono-repo-landing.pages.dev',
      '/dashboard': 'https://mono-repo-dashboard.pages.dev',
      '/game': 'https://mono-repo-game2048.pages.dev',
      '/game-2048': 'https://mono-repo-game2048.pages.dev',
    }

    // Check if path matches a route
    let targetUrl = routes[path]

    // Handle subpaths (e.g., /dashboard/something)
    if (!targetUrl) {
      for (const [route, destination] of Object.entries(routes)) {
        if (path.startsWith(route + '/')) {
          targetUrl = destination
          break
        }
      }
    }

    // If no route matched, serve home page (default)
    if (!targetUrl) {
      targetUrl = 'https://vian-project.pages.dev'
    }

    // Clone the request and modify URL
    const target = new URL(targetUrl)
    target.pathname = path
    target.search = url.search

    // Fetch from target and return
    return fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
  },
}
