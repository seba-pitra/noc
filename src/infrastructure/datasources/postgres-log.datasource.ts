import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();


const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog( log: LogEntity ): Promise<void> {
        const level = severityEnum[log.level]

        const newLog = await prismaClient.logModel.create({
            data: { ...log, level }
        });

        console.log('Postgres Log Created', newLog.id);
    }

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]

        const foundLogs = await prismaClient.logModel.findMany({
            where: { level }
        })

        return foundLogs.map(  LogEntity.fromObject );
    }

}


