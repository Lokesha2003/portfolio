# Lokesha Perera — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Updating content

All text lives in `src/data/`. You shouldn't need to touch components to update the site.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, headline, intro, photo, email, socials, availability badge, About text, interests, info cards |
| `skills.ts` | Skill categories and their skills |
| `experience.ts` | Work experience timeline |
| `projects.ts` | Projects, features, tech stack, screenshots and links |
| `education.ts` | Education timeline and certifications |
| `activities.ts` | Leadership and extracurricular activities |
| `navigation.ts` | Section order and which sections appear in the desktop navbar |

Things waiting on you:

- **LinkedIn**: set `socials.linkedin` in `profile.ts`. Until then it shows as "coming soon" and isn't a link.
- **Availability badge**: set `availability` in `profile.ts` (e.g. `'Open to internship opportunities'`) to show a badge in the hero.
- **Virtusa end date**: confirm `end` in `experience.ts`.
- **PharmaTwin progress**: each research area in `projects.ts` has a `status` of `'implemented'`, `'in-progress'` or `'planned'`. All are currently `'in-progress'`.
- **Project links and screenshots**: add `links.github` / `links.demo` and `image` per project. Buttons only appear when a link exists. Put screenshots in `public/images/projects/`.
- **Certificate images and verification links**: `previewImage` / `credentialUrl` in `education.ts`.
- **Company logo**: `logo` in `experience.ts`.
- **Photo**: `public/images/lokesha-perera.webp` was cropped from the CV and is only 188 px in the original. A higher-resolution square photo would look sharper.

## Contact form

There's no backend, so by default the form opens the visitor's email app with their message filled in, and says so on the page.
To send messages directly, create `.env.local` with an endpoint that accepts a JSON POST (for example a [Formspree](https://formspree.io) form):

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

## Deploying

The site is static: deploy `dist/` to Vercel, Netlify or GitHub Pages.

- For GitHub Pages at `https://lokesha2003.github.io/portfolio/`, set `base: '/portfolio/'` in `vite.config.ts`.
- Once you have a live URL, make `og:image` and the other social meta tags in `index.html` absolute (e.g. `https://your-domain/og-image.jpg`) so link previews work.
