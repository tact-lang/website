> [!CAUTION]
> Deprecated! Please, learn the [Tolk Language](https://docs.ton.org/blockchain-basics/tolk/overview)

# Tact Website

Developed by [TON Studio](https://tonstudio.io), powered by the community.

[![Website](https://img.shields.io/badge/Website-blue?style=flat)](https://tact-lang.org)
[![Documentation](https://img.shields.io/badge/Documentation-blue?style=flat)](https://docs.tact-lang.org)
[![Audited by Trail of Bits](https://img.shields.io/badge/Audited%20by-Trail%20of%20Bits-blue?style=flat-square)](https://github.com/trailofbits/publications/blob/master/reviews/2025-01-ton-studio-tact-compiler-securityreview.pdf)
[![Twitter](https://img.shields.io/badge/X%2FTwitter-white?logo=x&style=flat&logoColor=gray)](https://x.com/tact_language)
[![Telegram](https://img.shields.io/badge/Community_Chat-white?logo=telegram&style=flat)](https://t.me/tactlang)
[![Telegram](https://img.shields.io/badge/Tact_Kitchen_🥣-white?logo=telegram&style=flat)](https://t.me/tact_kitchen)

## Local setup

> [!IMPORTANT]
> Make sure you have Node.js version 16 or higher installed. To verify, run `node --version` — it should display at least 16.13.0 but not exceed version 22.
> Otherwise, download and install Node.js 22 from here: https://nodejs.org/en/download.

1. Install dependencies without altering the lockfile: `npm ci`
2. Start a local development server: `npm run start`

This will open a new browser window displaying the local version of the website. Most updates are automatically reflected.

## Project structure

Here is a top-level overview of the directory structure:

```
├── docs/             ← folder with compilation artifacts
├── pdfs/             ← docs: audits, whitepapers, etc.
├── src
│   ├── app           ← main code of the website
│   ├── assets        ← images, fonts, favicons, misc.
│   ├── environments
│   ├── favicon.ico
│   ├── global.d.ts
│   ├── index.html    ← landing page template
│   ├── main.ts
│   ├── polyfills.ts
│   ├── scripts
│   ├── styles        ← global Sass styles
│   └── styles.scss   ← main Sass style file
├── .gitignore
├── CNAME             ← Contains a URL for GitHub Pages deployments
├── package.json
├── tsconfig.json
└── angular.json      ← Angular configuration
```

If we switch to the `app/` directory, it has the following contents:

```
├── app.component.html
├── app.component.scss
├── app.component.ts
├── app.module.ts          ← root module (rarely modified)
├── app-routing.module.ts
├── core/
│   ├── components         ← footer and header components
│   ├── constants          ← link constants (docs, social media, etc.)
│   ├── core.module.ts     ← module declaring footer, header, and misc.
│   └── models
├── features/              ← IMPORTANT: modules that constitute the landing page
└── shared/                ← modules shared (rarely modified)
```

## Commands

All commands are run from the root of the project, from the terminal:

Command               | Action
:-------------------- | :-----
`npm ci`              | Install dependencies without changing the `package-lock.json`.
`npm run start`       | Starts local dev server at `localhost:4200`.
`npm run build`       | Build a production site to `./docs/`. This step is mandatory for correct [deployments](#deployment).
`npm run ng -- ...`   | Access and run Angular's CLI commands directly.

## Deployment

Deployments are done to GitHub Pages via GitHub Actions. The pipeline triggers when anything is merged into the `master` branch.

Currently, CI does NOT build the website for you. Instead, it only uses the built contents of the `docs/` folder as is. Therefore, after editing any code, you need to:

1. Stop the local server if it is currently running: `Ctrl+C` in the respective terminal
2. Make the build: `npm run build`
3. Commit the build together with all your changes
4. Open a PR with your changes — they should include the new build in `docs/`!
