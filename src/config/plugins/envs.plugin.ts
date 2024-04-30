import 'dotenv/config';


export const envs = {
    PORT: process.env.PORT,
    MAILER_EMAIL: process.env.MAILER_EMAIL,
    MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY,
}
