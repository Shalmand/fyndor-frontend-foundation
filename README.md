# Fyndor Frontend Foundation

FYNDOR — Sprint 00.1 — Frontend Foundation

You are helping build a production-quality frontend for a storytelling platform called Fyndor.

This is NOT a prototyping session.

Treat this project as a real software product.

The platform is inspired by the visual discovery of streaming platforms, but focused on reading stories and fanfiction.

The UI must feel premium, elegant and cinematic.

Do NOT create any pages yet.

Do NOT create backend.

Do NOT connect Supabase.

Do NOT implement authentication.

Do NOT create database schemas.

Do NOT create AI features.

Do NOT create recommendation logic.

The objective of this sprint is ONLY to build the frontend foundation.

Tech Stack

Use:

React

TypeScript

Tailwind CSS

shadcn/ui

Lucide Icons

Follow modern best practices.

Create the following architecture

Create a scalable folder structure suitable for a large application.

Suggested organization:

layouts

pages

components

features

hooks

providers

lib

types

assets

mock

styles

Keep everything modular.

Create the global Theme

Create a complete design token system.

Include:

Colors

Typography

Spacing

Border Radius

Shadows

Transitions

Breakpoints

Container Widths

Do not hardcode styles inside components.

Everything should come from tokens.

Prepare Layouts

Create empty reusable layouts only.

Do not create screens.

Layouts:

PublicLayout

ReaderLayout

ReadingLayout

StudioLayout

AdminLayout

Each layout should be responsive and reusable.

Configure Routing

Prepare routing structure for future pages.

Create placeholder routes only.

Do not implement page content.

Mock Data

Create realistic mock objects for:

Stories

Authors

Universes

Franchises

Genres

Lore Cards

Reading Lists

Comments

Reviews

Notifications

Avoid lorem ipsum.

Use believable fictional content.

Project Principles

Every component must be reusable.

Dark mode is the default.

Use purple as the primary accent.

Large covers.

Minimal interface.

Netflix-quality spacing.

Apple-quality polish.

Reading-first experience.

No duplicated styles.

No duplicated components.

No temporary solutions.

Important

This sprint must finish with a clean frontend foundation ready to receive components in the next sprint.

Do not continue beyond this scope.

If a future feature is required, leave extension points instead of implementing it now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0d4abcc6-0c79-425b-a2f9-76430f0fa5e8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
