import mongoose from 'mongoose';
import { MongoDatabase } from '../../../src/data/mongo/init';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';



describe('mongo-log.datasource.ts', () => {
    const logDatasource = new MongoLogDatasource()
    const dataLog = {
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    };
    const log = new LogEntity( dataLog )
    
    beforeAll( async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany();
    })

    afterAll(async () => {
        mongoose.connection.close()
    })


    it('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(log);
    
        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith("Mongo Log Created", expect.any(String) );
    })

    it('should get logs', async () => {
        await logDatasource.saveLog( log )
        await logDatasource.saveLog( log )

        const foundLogs = await logDatasource.getLogs( LogSeverityLevel.medium )

        expect( foundLogs.length ).toBe(2);
        expect( foundLogs[0].level ).toBe( LogSeverityLevel.medium );
        expect( foundLogs[1].level ).toBe( LogSeverityLevel.medium );
    })
})


