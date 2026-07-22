# Repository Guidelines

## Project Structure & Module Organization

This repository is a dependency-free, single-page wedding invitation. `index.html` contains the page structure and Ukrainian copy. Put interactive behavior in `src/main.js` and all layout, responsive rules, animations, and design tokens in `src/styles.css`. Static media lives under `assets/`: use `assets/photos/` for invitation photography and location artwork, and `assets/deco/` for decorative elements and palette swatches. GitHub Pages deployment is defined in `.github/workflows/pages.yml`.

Keep paths relative so the site continues to work both locally and on GitHub Pages. Optimize large images before committing; prefer WebP for photographic content when transparency is not required.

## Build, Test, and Development Commands

There is no build step or package installation. From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Serving over HTTP is preferred to opening `index.html` directly because it matches hosted asset loading more closely.

Useful validation commands:

```sh
git status --short
git diff --check
```

The first reveals accidental generated files or untracked assets; the second catches whitespace errors.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Follow the existing style: double quotes in HTML and JavaScript, semicolons in JavaScript, and one CSS declaration per line. Use descriptive kebab-case CSS classes, with BEM-like element names where appropriate (for example, `.loader-envelope__seal`). Define reusable colors and typography as custom properties in `:root`. Preserve semantic HTML, Ukrainian language attributes, useful alternative text, and ARIA labels for interactive controls.

## Testing Guidelines

No automated test framework or coverage threshold is configured. Before submitting, test the envelope opening, countdown, RSVP validation, `+1` field toggle, external map links, and responsive layout. Check at least a narrow mobile viewport and a desktop viewport, and confirm that the browser console has no errors.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, title-case subjects such as `Refine invitation details and decorations`. Keep each commit focused and avoid committing `.DS_Store` or unused media. Pull requests should summarize visible and behavioral changes, list manual checks performed, link any relevant issue, and include before/after screenshots for layout, animation, or asset changes.
