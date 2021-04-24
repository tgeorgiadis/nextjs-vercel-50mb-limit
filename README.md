## Repo Purpose
Highlighting the issue with NextJS deployments on Vercel due to dependency bundling in the /pages/api directory

### Running Locally
```bash
npm run dev
# or
yarn dev
```

### Routes in project:

/api/screenshot - Returns a screenshot importing `chrome-aws-lambda`

### The 50mb size limit
When deployed to Vercel we hit the 50mb serverless function limit

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftgeorgiadis%2Fnextjs-vercel-50mb-limit&project-name=nextjs-vercel-50mb-limit)
```
Error: The Serverless Function "api/screenshot" is 50.65mb which exceeds the maximum size limit of 50mb. Learn More: https://vercel.link/serverless-function-size
```