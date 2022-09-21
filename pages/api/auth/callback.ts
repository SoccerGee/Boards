import { handleCallback, HandlerError, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = (req: NextApiRequest, res: NextApiResponse, session: Session, state: any ) : Session => {
  console.log(state);
  return session
};

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res, { afterCallback });
  } catch (error: any & HandlerError ) {
    res.status(error.status || 500).end(error.message);
  }
}
