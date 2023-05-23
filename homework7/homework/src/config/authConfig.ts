import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    KEY: process.env.KEY,
    jwtSecret: process.env.JWT_SECRET,
}));