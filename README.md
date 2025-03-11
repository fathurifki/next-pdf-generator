This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## ENV

you can use the following env variables to fetch data from the API

```bash
SECRET_JSON_PLACEHOLDER_API_URL=
SECRET_RANDOM_USER_API_URL=
NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL=
NEXT_PUBLIC_RANDOM_USER_API_URL=
```

## Tech Stack

- Next.js 14 with App Router
- Tailwind CSS
- Shadcn UI
- TypeScript
- React Hook Form (for form handling)
- Zod (for validation)
- Zustand (for state management)
- jsPDF (for PDF Generator)

## Docker

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```