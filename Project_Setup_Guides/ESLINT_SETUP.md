# ESLint Setup Guide

> Consistent lint configuration across projects prevents common bugs, enforces code quality, and keeps Fast Refresh working correctly in development.

---

## Stack Comparison

| Project | Stack | Config Format | Key Plugins |
|---------|-------|---------------|-------------|
| `My_Event_Maneger` | React + Vite 8 | Flat config (`eslint.config.js`) | `react-hooks`, `react-refresh` |
| `HRSaathi-UI` | Next.js | Legacy config (`.eslintrc.json`) | `next/core-web-vitals`, `prettier` |

---

## Setup: React + Vite (Flat Config — ESLint v9+)

Vite scaffolds this automatically. Here's the production-ready version with all recommended additions.

### 1. Installed Packages (already included in Vite scaffold)

```bash
npm i -D eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### 2. `eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

### 3. `package.json` scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 4. Run lint

```bash
npm run lint             # check only
npm run lint:fix         # auto-fix what's possible
npx eslint src --max-warnings=0   # strict: fail on any warning
```

---

## Setup: Next.js (Legacy Config — `.eslintrc.json`)

### 1. Install Packages

```bash
npm i -D eslint eslint-config-next eslint-config-prettier eslint-plugin-prettier prettier
```

### 2. `.eslintrc.json`

```json
{
  "extends": ["eslint:recommended", "next/core-web-vitals", "prettier"],
  "plugins": ["react", "prettier"],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "react/react-in-jsx-scope": "off",
    "no-empty-function": "off",
    "no-explicit-any": "off",
    "@next/next/no-img-element": "off",
    "no-unused-vars": "off"
  },
  "settings": {
    "react": { "version": "detect" }
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  }
}
```

### 3. `.prettierrc`

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "jsxSingleQuote": false,
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

### 4. `package.json` scripts

```json
{
  "scripts": {
    "lint": "next lint",
    "lint-fix": "next lint --fix"
  }
}
```

---

## Common Lint Errors & How to Fix Them

### 1. `no-unused-vars` — Variable/import defined but never used

```jsx
// ❌ Error
import { Send, Phone, CircleCheck } from 'lucide-react'
// Send and CircleCheck are never used in JSX

// ✅ Fix — remove unused imports
import { Phone } from 'lucide-react'
```

---

### 2. `react-hooks/set-state-in-effect` — setState called synchronously in useEffect

This causes cascading renders and is a React anti-pattern.

```jsx
// ❌ Error — closes menu on every location object re-render
useEffect(() => {
  setMobileOpen(false)
}, [location])

// ✅ Fix — use useRef to track previous value, only update on real change
const prevPathname = useRef(location.pathname)
useEffect(() => {
  if (prevPathname.current !== location.pathname) {
    prevPathname.current = location.pathname
    setMobileOpen(false)
  }
}, [location.pathname])
```

> [!NOTE]
> The root cause: `location` (the whole object) changes reference on every render even if the pathname didn't change. Always depend on `location.pathname` and guard with a ref comparison.

---

### 3. `react-refresh/only-export-components` — Non-component exported from component file

React Fast Refresh only works when a file exports exclusively React components. Exporting hooks, constants, or utility functions from the same file breaks HMR.

**Case A — Duplicate export (remove it):**
```jsx
// ❌ Error — THEMES exported twice: once inline, once at bottom
export function ThemeProvider() { ... }
export { THEMES }   // ← redundant, also triggers the error

// ✅ Fix — remove the duplicate export at the bottom
// THEMES is already available as a module-level const
```

**Case B — Hook co-located with component (suppress with comment):**
```jsx
// ❌ Error — useTheme hook exported alongside ThemeProvider component
export function useTheme() { ... }

// ✅ Fix — use eslint-disable when the hook MUST live in the same file
// (e.g., it accesses a private context not exported elsewhere)
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() { ... }
```

> [!TIP]
> Prefer moving hooks/constants to a separate file (e.g. `useTheme.js`) when possible. Only use `eslint-disable` when the hook shares a private reference (like an unexported `createContext`) with the component in the same file.

---

### 4. `no-unused-vars` — Variable assigned but never used

```jsx
// ❌ Error
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}
// fadeIn is never referenced in JSX

// ✅ Fix — delete it, or prefix with _ if intentionally unused
// const _fadeIn = { ... }   ← some configs allow _ prefix
```

---

## Quick Fix Workflow

```bash
# 1. See all errors at once
npx eslint src --max-warnings=0

# 2. Auto-fix what ESLint can (unused vars need manual removal)
npx eslint src --fix

# 3. Confirm clean
npx eslint src --max-warnings=0
# → no output = ✅ all clear
```

---

## Rule Cheatsheet

| Rule | What it catches | Fix strategy |
|------|----------------|--------------|
| `no-unused-vars` | Imported/declared but never used | Remove import or variable |
| `react-hooks/set-state-in-effect` | `setState` synchronously inside `useEffect` | Use `useRef` guard or restructure logic |
| `react-hooks/rules-of-hooks` | Hook called conditionally or outside component | Move hook to top level of component |
| `react-hooks/exhaustive-deps` | Missing `useEffect` dependency | Add missing dep or use `useCallback` |
| `react-refresh/only-export-components` | Non-component export in component file | Move to separate file or `// eslint-disable-next-line` |
| `no-undef` | Variable used before declaration | Fix import or declare variable |

---

## Suppression Patterns

Use sparingly — always prefer fixing the root cause.

```js
// Disable for one line
// eslint-disable-next-line react-refresh/only-export-components

// Disable for entire file (use only for config/utility files)
/* eslint-disable no-unused-vars */

// Disable a rule for a block
/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => { ... }, [])
/* eslint-enable react-hooks/exhaustive-deps */
```

---

## Reference Projects

| Project | Config file | Stack |
|---------|-------------|-------|
| `My_Event_Maneger` | [`eslint.config.js`](file:///Users/hemantdimri27/Documents/Personal/ProffestionalWork/My_Event_Maneger/eslint.config.js) | React + Vite 8, Flat config |
| `HRSaathi-UI` | `/Users/hemantdimri27/Documents/Skysoft_working/HRSaathi-UI/.eslintrc.json` | Next.js, Legacy config + Prettier |
