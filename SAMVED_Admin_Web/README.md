# SAMVED Admin Workspace

A local-first, static Next.js prototype for the SAMVED personnel wellbeing admin experience. It gives administrators a single dashboard for reviewing fictional wellbeing indicators, support priority, broad app check-in summaries, and simulated computer-vision observations from Indian training camps.

> **Demo only:** every person, image, score, priority, camera observation, and wellbeing signal in this repository is fictional. This project has no live camera, model, app, account, or data-service connection.

## What is included

- **Home** — snapshot of operational wellbeing, support queue, completion, and recent simulated observations.
- **Dashboard** — trends for wellbeing, sleep, energy, interactions, check-ins, and aggregated app themes.
- **Database** — searchable, filterable and exportable fictional personnel records.
- **Priority** — support queue ranked by fictional critical, high, watch, and stable labels.
- **Monitoring** — generated Indian training-camp scenes with illustrative yellow detection overlays.
- **Personnel profiles** — visual signals and broad app/check-in summaries in separate tabs.

The admin view deliberately shows only broad summaries and trends. It does not contain chat transcripts or private conversations.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 with custom CSS for the SAMVED visual system
- `lucide-react` icons
- Static export for deployment on an internal web server

## Run locally

### Requirements

- Node.js 20.9 or later
- npm 10 or later

### Installation

```bash
git clone <your-repository-url>
cd SAMVED_Admin_Web
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Checks and static build

```bash
npm run typecheck
npm run build
```

`npm run build` writes the deployable static site to `out/`. Copy the contents of that folder to an approved internal web server or intranet hosting location. The exported site requires no Node.js server at runtime.

## Project structure

```text
app/                    Route entry points and global styling
components/             Dashboard, database, priority, profile and monitoring UI
lib/demo-data.ts        All fictional records, history and camera-overlay coordinates
public/images/          Generated personnel and training-camp image assets
public/favicon.svg      Browser icon
design/asset-prompts.json
                        Provenance prompts for generated visual assets
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home snapshot |
| `/dashboard/` | Analytics dashboard |
| `/database/` | Personnel database |
| `/priority/` | Support priority queue |
| `/monitoring/` | Simulated visual monitoring |

## Working with the demo data

All display data lives in [`lib/demo-data.ts`](lib/demo-data.ts). Update that file to change fictional personnel, analytics history, priority labels, camera observations, or the yellow detection-box coordinates.

The monitoring images are generated visual assets. Their provenance prompts are kept in [`design/asset-prompts.json`](design/asset-prompts.json).

## Privacy and deployment notes

This repository is intentionally a UI prototype. Before using it with real personnel information, provide the appropriate authentication, role-based authorization, auditing, encrypted data storage, retention controls, secure model/data integrations, and an approved deployment review. Keep personal chat content out of the admin interface unless a clearly authorized policy and access model requires it.

## License

No license has been selected yet. Add a license file before distributing the code outside the intended project team.
