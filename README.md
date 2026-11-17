# Portfolio

A single-page portfolio built with Next.js App Router, React, TypeScript, and CSS.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update portfolio content

Edit [`data/portfolio.json`](./data/portfolio.json) to update the personal details, biography, skills, projects, experience, education, hackathons, testimonials, and blog posts. Set `resumeUrl` to a public resume URL to show the CV button. Project and article cards without valid links remain visible but are not rendered as broken links. The hackathons, testimonials, and blog sections stay hidden while their data arrays are empty.

The contact form opens a prefilled message in the visitor's email app; it does not send or store messages on the site.

## Verify

```bash
npm run lint
npm run build
```
