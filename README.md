## DEVELOPMENT ENVIRONMENT SETUP

1. Install NPM or YARN
2. From the project's root, install dependencies using `npm install` or `yarn`
3. Download and install Planetscale CLI:  [here](https://planetscale.com/docs/concepts/planetscale-environment-setup)
4. Authenticate using `pscale auth login`
5. Connect to the correct organization: `pscale org switch boards`
6. Run Proxy from local to db: `pscale connect boards dev --port 3309`
7. Via Slack request your `.env.local` and `.env files`
8. Run the local webdevelopment server: `npm run dev` or `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Add a new API route:
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
