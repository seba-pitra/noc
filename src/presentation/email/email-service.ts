import nodemailer from 'nodemailer'


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}


export interface Attachment {
    filename: string;
    path: string;
}


export class EmailService {

    constructor(
        private readonly transporter: nodemailer.Transporter
    ) {}

    async sendEmail( options: SendMailOptions ): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
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