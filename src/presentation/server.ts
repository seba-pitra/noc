import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";



const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    // new MongoLogDatasource()
    new PostgresLogDatasource()
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

const emailService = new EmailService(); 

export class ServerApp {
    
    
    public static async start() {
        console.log('Server Started')

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // )
        // .execute([
        //     'sebastian.pitra10@gmail.com',
        //     'seeba5024@gmail.com',
        // ])
        
        const createdJob3 = CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';

                // new CheckService(
                //     logRepository,
                //     () => console.log('success'),
                //     (error) => console.error(error),
                // ).execute( url );

                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
                    () => console.log('success'),
                    (error) => console.error(error),
                ).execute( url );
            }
        );
    }





}