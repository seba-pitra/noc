import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service"



export class ServerApp {
    
    
    public static start() {
        console.log('Server Started')

        const createdJob3 = CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://localhost:3000'

                new CheckService(
                    () => console.log('success'),
                    (error) => console.error(error),
                ).execute( url );
            }
        );
    }





}