import { handleAuth, handleLogin, handleLogout, HandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const getLoginState = (req: NextApiRequest) => {
    return {
        returnTo: '/'
    }
}

export default handleAuth({
    async login (req: NextApiRequest, res: NextApiResponse) {
        try {
            await handleLogin(req,res, { 
                getLoginState,
            });
        } catch (error: any & HandlerError) {
            res.status(error.state || 500).end(error.message)
        }
    },
});