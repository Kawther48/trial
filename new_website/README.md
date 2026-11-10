# Comfy

Comfy is a static Astro hoodie-shop demo. It is published at
https://kawther48.github.io/trial/ by the GitHub Actions workflow in
`../.github/workflows/deploy.yml`.

## Local development

Run these commands from this directory:

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`, then preview it with
`npm run preview`.

## GitHub Pages

The workflow builds the site and deploys `dist/` to GitHub Pages when changes
are pushed to `main` or when manually started from the Actions tab. In the
repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**.
