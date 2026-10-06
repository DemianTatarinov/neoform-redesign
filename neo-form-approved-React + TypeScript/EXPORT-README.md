# Neo Form site export — version ff2a2a89

This archive contains the source code of the Neo Form website version requested by the user, including all CSS styles, React pages, components, configuration, and package lockfile.

## Run locally

Requirements: Node.js 20+ and pnpm.

```bash
cd neo-form-site
pnpm install
pnpm dev
```

For a production build:

```bash
pnpm check
pnpm build
```

## Notes

- The project is a React/Vite WebDev project.
- Main global styles are in `client/src/index.css`.
- Page and component styles are included in the React source.
- Media references use `/manus-storage/...` paths from the WebDev environment. If running fully outside WebDev, replace those paths with local/public asset paths.
