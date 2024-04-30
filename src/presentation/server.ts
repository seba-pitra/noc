import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class ServerApp {
    
    
    public static start() {
        console.log('Server Started')

        const createdJob3 = CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';

                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('success'),
                    (error) => console.error(error),
                ).execute( url );
            }
        );
    }





}