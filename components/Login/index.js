import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Login = () => (
    <Card sx={{ width: 250 }} className="LoginCard">
        <CardContent className="LoginCardContent">
            <Link href="/api/auth/login">Log In</Link>
        </CardContent>
    </Card>
);

export default Login;