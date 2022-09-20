import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

const getLoginState = (req, loginOptions) => {
    return {
        returnTo: `/`
    }
}

export default handleAuth({
    async login (req, res) {
        try {
            await handleLogin(req,res, { 
                getLoginState,
            });
        } catch (error) {
            res.status(error.state || 500).end(error.message)
        }
    },
});