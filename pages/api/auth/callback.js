import { handleCallback } from '@auth0/nextjs-auth0';

const afterCallback = (req, res, session, state) => {
  console.log(state);
  return session
};

export default async function callback(req, res) {
  try {
    await handleCallback(req, res, { afterCallback });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
