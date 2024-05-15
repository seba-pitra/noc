import { envs } from '../../../src/config/plugins/envs.plugin';

describe ('envs.plugin.ts', () => {
    
    test('should return env options', () => {console.log(envs)
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'emailtest@gmail.com',
            MAILER_SECRET_KEY: 'email123',
            PROD: false,
            MONGO_URL: 'mongodb://mongouser:12345678@localhost:27018',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_DB_USER: 'mongouser',
            MONGO_DB_PASS: '12345678'
        })
    })
    
    test('should return error if not found env', async () => {
        jest.resetModules();

        process.env.PORT = 'ABC'
    
        try {
            await import("../../../src/config/plugins/envs.plugin")

            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })


})