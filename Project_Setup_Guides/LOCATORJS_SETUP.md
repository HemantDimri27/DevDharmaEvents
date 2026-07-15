# LocatorJS Setup Guide

> **What is LocatorJS?**  
> Hold `Alt` (Option on Mac) and click any element in the browser to instantly jump to its source code in your IDE. Works only in development — zero overhead in production.

---

## Stack Compatibility

| Framework | Bundler | Status |
|-----------|---------|--------|
| Next.js (App/Pages Router) | Webpack / Turbopack | ✅ Use `@locator/webpack-loader` |
| React + Vite **≤ 7** | Rollup + Babel | ✅ Use `@locator/babel-jsx` via `react()` babel option |
| React + Vite **8+** | Rolldown + **OXC** | ✅ Use `@locator/babel-jsx` via `@rolldown/plugin-babel` |

> [!IMPORTANT]
> **Vite 8 dropped Babel** in favour of OXC. The `babel` option inside `@vitejs/plugin-react` is silently ignored in v6+.  
> You **must** use `@rolldown/plugin-babel` as a standalone plugin instead.

---

## Setup: React + Vite 8 (Current Stack)

### 1. Install Dependencies

```bash
npm i -D @locator/runtime @locator/babel-jsx @rolldown/plugin-babel --legacy-peer-deps
```

> `--legacy-peer-deps` is needed due to a `@babel/core` version conflict between `@locator/babel-jsx` (needs v7) and `@rolldown/plugin-babel` (peer-requires v8).

---

### 2. Configure `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react(),
      // Vite 8 uses OXC, not Babel. @locator/babel-jsx needs Babel to inject
      // source location data (data-locatorjs attributes) into JSX elements.
      // @rolldown/plugin-babel hooks into Rolldown's transform pipeline instead.
      isDev && babel({
        include: [/\.jsx?$/, /\.tsx?$/],
        exclude: [/node_modules/],
        plugins: [
          ['@locator/babel-jsx/dist', { env: 'development' }],
        ],
      }),
    ].filter(Boolean),
  }
})
```

> [!WARNING]
> Do **not** use glob strings like `'src/**/*.jsx'` in `include` — they won't work because the plugin matches against **absolute file paths**. Use **regex** instead.

---

### 3. Create `src/components/LocatorSetup.jsx`

```jsx
import { useEffect } from "react";

/**
 * LocatorSetup
 * Initializes the LocatorJS runtime UI overlay in development mode only.
 * Hold Alt (Option on Mac) and click any element to jump to its source in your IDE.
 *
 * This component renders nothing in production builds.
 */
export default function LocatorSetup() {
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      import("@locator/runtime").then(({ default: setupLocatorUI }) => {
        setupLocatorUI({
          projectPath: "/absolute/path/to/your/project", // ← update this
        });
      });
    }
  }, []);

  return null;
}
```

> [!NOTE]
> `projectPath` tells the runtime where your project root is on disk so it can build correct editor links (e.g., `vscode://file/...`). Set it to the **absolute path of your project root**.

---

### 4. Add `<LocatorSetup />` to Your App Root

In `src/App.jsx` (or wherever your router/providers live):

```jsx
import LocatorSetup from './components/LocatorSetup.jsx'

export default function App() {
  return (
    <SomeProvider>
      <BrowserRouter>
        <LocatorSetup />   {/* ← add this inside the tree */}
        {/* ... rest of your app */}
      </BrowserRouter>
    </SomeProvider>
  )
}
```

---

### 5. Run Dev Server

```bash
npm run dev
```

Then in the browser: hold **`Alt`** and hover over any element. Click to open the source file in your IDE.

---

## Setup: Next.js (Turbopack)

### 1. Install Dependencies

```bash
npm i @locator/runtime
npm i -D @locator/webpack-loader
```

### 2. Configure `next.config.ts`

```ts
import type { NextConfig } from "next";

const locatorLoader = {
  loaders: [
    {
      loader: "@locator/webpack-loader",
      options: { env: "development" },
    },
  ],
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.tsx": locatorLoader,
      "*.jsx": locatorLoader,
      "*.ts":  locatorLoader,
      "*.js":  locatorLoader,
    },
  },
};

export default nextConfig;
```

### 3. Create `src/components/LocatorSetup.tsx`

```tsx
"use client";

import { useEffect } from "react";

export default function LocatorSetup() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@locator/runtime").then(({ default: setupLocatorUI }) => {
        setupLocatorUI();
      });
    }
  }, []);

  return null;
}
```

### 4. Add to Root Layout (`src/app/layout.tsx`)

```tsx
import LocatorSetup from "@/components/LocatorSetup";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LocatorSetup />
        {children}
      </body>
    </html>
  );
}
```

---

## How It Works (Internals)

```
Browser click (Alt+Click)
        │
        ▼
@locator/runtime reads `data-locatorjs` attribute on the DOM element
        │
        ▼
Attribute was injected by @locator/babel-jsx at build time
(e.g. data-locatorjs="/src/components/Navbar.jsx::42:5")
        │
        ▼
runtime builds an editor link using projectPath + filePath + line:col
        │
        ▼
Opens file in IDE (VSCode, WebStorm, etc.)
```

> [!NOTE]
> This is why `@locator/babel-jsx` (or `@locator/webpack-loader`) is **mandatory**.  
> Without it, LocatorJS has no source location data → shows **"Source not found"**.  
> React 19 removed `_debugSource` that older versions relied on, making the Babel plugin required.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Source not found" | Babel plugin not running / no `data-locatorjs` attrs | Verify build output contains `__LOCATOR_DATA__` |
| LocatorJS overlay not appearing | Runtime not initialized | Check `LocatorSetup` is mounted and `MODE === 'development'` |
| `babel` option in `react()` ignored | Vite 8 uses OXC, not Babel | Use `@rolldown/plugin-babel` as separate plugin |
| Glob `include` not matching | Plugin matches absolute paths | Use regex: `/\.jsx?$/` instead of `'src/**/*.jsx'` |
| npm install conflict | `@babel/core` v7 vs v8 peer conflict | Add `--legacy-peer-deps` |

### Verify the Babel Plugin Is Running

```bash
# Build in dev mode and check for injected data
npx vite build --mode development
grep -c "__LOCATOR_DATA__" dist/assets/index-*.js
# Should print a number > 0
```

---

## Reference Projects

| Project | Stack | Config location |
|---------|-------|-----------------|
| `My_Event_Maneger` | React + Vite 8 | `vite.config.js`, `src/components/LocatorSetup.jsx` |
| `Danu_Creations` | Next.js + Turbopack | `next.config.ts`, `src/componants/LocatorSetup.tsx` |
