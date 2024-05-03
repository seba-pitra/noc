import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const emailService = new EmailService(); 

export class ServerApp {
    
    
    public static start() {
        console.log('Server Started')

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // )
        // .execute([
        //     'sebastian.pitra10@gmail.com',
        //     'seeba5024@gmail.com',
        // ])

        // const createdJob3 = CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log('success'),
        //             (error) => console.error(error),
        //         ).execute( url );
        //     }
        // );
    }





}