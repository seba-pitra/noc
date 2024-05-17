import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";
import nodemailer from 'nodemailer';



const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
    // new PostgresLogDatasource()
)

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const trasporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
        user: envs.MAILER_EMAIL,
        pass: envs.MAILER_SECRET_KEY,
    }
})
const emailService = new EmailService(trasporter); 

export class ServerApp {
    
    
    public static async start() {
        console.log('Server Started')

        new SendEmailLogs(
            emailService,
            fsLogRepository
        )
        .execute([
            'yourEmail@gmail.com',
        ])
        

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';

                // new CheckService(
                //     postgresLogRepository,
                //     () => console.log('success'),
                //     (error) => console.error(error),
                // ).execute( url );

                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository,postgresLogRepository ],
                    () => console.log('success'),
                    (error) => console.error(error),
                ).execute( url );
            }
        );
    }





}