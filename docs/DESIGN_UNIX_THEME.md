# UX/UI Architecture: Modern UNIX IDE Theme 

## Understanding Summary
*   **What is being built/updated:** A structural cleanup and global restyling of all existing apps in the monorepo (`home`, `landing-page`, `dashboard`, `game-2048`), followed by scaffolding new simple projects (`htop-monitor`, `markdown-scratchpad`, `terminal-cheatsheet`).
*   **Why it exists:** To elevate the portfolio's aesthetics to a modern, unified design system and ensure the codebase remains clean, maintainable, and scalable.
*   **Who it is for:** Visitors to the web portfolio, showcasing skills in complex monorepo setups, clean code architecture, and premium IDE/UNIX UI/UX design.
*   **Key constraints:** Maintain existing Turborepo/pnpm setup, utilize shared `packages/` (`ui`, `config`), and ensure changes don't break Vercel path-based deployment.
*   **Explicit non-goals:** No switching core frameworks (Next.js/Vite) or package managers (pnpm). Core functionalities of existing applications remain intact.

## Assumptions & Design Constraints
1.  **"UNIX styling" Definition:** A developer-centric aesthetic mimicking a modern IDE (VS Code, Cursor). Dark mode exclusively, using IDE-style color palettes (One Dark/Dracula).
2.  **Anti-AI Aesthetic:** Strictly **NO glassmorphism**. Visuals must rely on solid opaque backgrounds, rigid flat borders, and typographic hierarchy rather than frosted glass or glowing overlays.
3.  **Global Uniformity:** The IDE layout applies globally. Visitors should feel like they are natively navigating inside a code editor even as they transition across different framework apps (Next.js to Vite).

## Decision Log
1.  **Theme Selection:** Proceeding with **Option A (The Modern Developer IDE)** for the global aesthetic.
2.  **New Projects:** Added three simple project ideas (`htop-monitor`, `markdown-scratchpad`, `terminal-cheatsheet`) to the backlog, targeting `htop-monitor` or `markdown-scratchpad` first after cleanup.
3.  **Design Restriction:** Implemented a hard ban on glassmorphism and semi-transparent blur effects.
4.  **Layout Architecture:** Components will be housed in `packages/ui` as a shared `<IDE_Layout />` component with fixed sidebars (File Explorer) and top bars (File Tabs).

## Final Design

### 1. Centralized Theme (Tailwind & CSS)
*   **Color Palette:** Tiered solid grays logic. 
    *   Sidebar: `#181818`
    *   Top Bar: `#1f1f1f`
    *   Editor Pane: `#1e1e1e`
    *   Borders: `1px solid #333333`
*   **Typography:** Primary font is sans-serif (e.g. *Inter*), with a global monospace font (e.g., *JetBrains Mono*) for File Explorer text, tabs, and technical data.
*   **Component Restyling:** Adjust `shadcn/ui` in `packages/ui` to have minimal border radiuses (`rounded-sm` or `rounded-none`).

### 2. Global IDE Layout Component
*   Hosted inside `packages/ui/src/components/IDE_Layout.tsx` (or similar).
*   **Sidebar (File Explorer):** Contains links to the applications structured as a file tree (e.g., `📁 home`, `📁 dashboard`).
*   **Editor Pane:** Render area for children content. 
*   **Cross-App Navigation:** Uses standard `<a>` tags for inter-app linking (so Vercel successfully routes between the Vite and Next.js apps seamlessly).

### 3. Edge Cases & Responsive Design
*   **Mobile Users:** The IDE layout hides the sidebar and tab bar behind a bottom command palette or top hamburger menu, prioritizing readability for mobile viewing.
