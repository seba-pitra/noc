import { LogDatasource } from '../../../src/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('log.datasource.ts', () => {


    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })
    
    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }
    
    it('should test the abstract class', async () => {
        const mockLogDataSource = new MockLogDatasource()


        expect(mockLogDataSource).toBeInstanceOf(MockLogDatasource)
        expect(mockLogDataSource).toHaveProperty('saveLog')
        expect(mockLogDataSource).toHaveProperty('getLogs')


        await mockLogDataSource.saveLog( newLog )

        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high)
        
        expect(logs).toHaveLength( 1 )
        expect( logs[0] ).toBeInstanceOf( LogEntity )
    })



})