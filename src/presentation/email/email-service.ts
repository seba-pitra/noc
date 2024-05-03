import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'


interface sendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments: Attachment[];
}


interface Attachment {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })

    constructor(
    ) {}

    async sendEmail( options: sendMailOptions ): Promise<boolean> {
        const { to, subject, htmlBody, attachments } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                attachments,
                html: htmlBody,
            })

            return true;
            
        } catch (error) {
            
            return false;
        }
    }


    async sendEmailWithFileSystemLogs( to: string | string[] ): Promise<boolean> {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>
                Se han presentado errores en algunos servidores. Dejamos los archivos de logs correspondientes para que puedas buscar el error
            </p>
            <p>Ver Logs adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-high.log',    path: './logs/logs-high.log' },
            { filename: 'logs-medium.log',  path: './logs/logs-medium.log' },
            { filename: 'logs-all.log',     path: './logs/logs-all.log' },
        ];


        return this.sendEmail({
            to,
            subject,
            attachments,
            htmlBody
        })
    }

}