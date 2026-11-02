# Repository Guidelines

## Project Structure & Module Organization

This directory currently contains no application code, assets, tests, or build configuration. Establish the project structure when choosing the implementation stack. Suggested locations are `src/` for application code, `tests/` for automated tests, and `public/` for static assets; adapt these to the framework's conventions. Group related modules by feature and document the resulting layout in `README.md`.

## Build, Test, and Development Commands

No development, build, lint, or test commands are configured yet. When adding tooling, provide reproducible commands for installing dependencies, running locally, building, and testing. Record the exact commands and required runtime versions in `README.md`. For example, document `npm run dev` only after defining that script in `package.json`. Commit the chosen package manager's lockfile.

## Coding Style & Naming Conventions

Follow the selected language and framework conventions. Until tooling defines otherwise, use two spaces for JSON, YAML, and frontend markup, and use descriptive names consistently within each module. Prefer `kebab-case` for static asset filenames, such as `seafood-banner.webp`. Add a formatter and linter appropriate to the stack, and keep their configuration in version control.

## Testing Guidelines

No testing framework or coverage threshold is established. Configure tests alongside the first testable functionality. Use descriptive test names that explain expected behavior, and follow the selected framework's file naming conventions. Cover critical user flows and add regression tests for bug fixes. Document how to run the suite before requiring it in pull requests.

## Commit & Pull Request Guidelines

No Git history is available to establish existing commit conventions. Use concise, imperative subjects; suggested prefixes include `feat:`, `fix:`, and `docs:`. Keep commits focused. Pull requests should describe the change, explain its purpose, link relevant issues, and report validation performed. Include screenshots for visual changes and identify any setup or configuration changes.

## Security & Configuration

Keep credentials and local environment files out of version control. When configuration is introduced, provide a sanitized `.env.example` and document required variables.
