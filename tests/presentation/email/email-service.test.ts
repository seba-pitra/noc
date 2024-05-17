import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from '../../../src/presentation/email/email-service';

describe('email.service.ts', () => {
    
    const mockSendMail = jest.fn();
    
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    
    const emailService = new EmailService();

    it('should send email', async () => {

        const options: SendMailOptions = {
            to: 'sebastian.pitra10@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>test</h1>'
        }

        await emailService.sendEmail( options )

        expect( mockSendMail ).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>test</h1>",
            "subject": "Test",
            "to": "sebastian.pitra10@gmail.com",
        });
    })
   
    it('should send email with attachments', async () => {
        const email = 'sebastian.pitra10@gmail.com';

        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: [
                { filename: 'logs-high.log',    path: './logs/logs-high.log' },
                { filename: 'logs-medium.log',  path: './logs/logs-medium.log' },
                { filename: 'logs-all.log',     path: './logs/logs-all.log' }
            ]
        })
    })
})