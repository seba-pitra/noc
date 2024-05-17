import { LogRepository } from '.../../../src/domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('log.repository.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.repository.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })
    
    class MockLogRepository implements LogRepository {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }
    }


    it('should test the abstract class', async () => {
        const mockLogRepository = new MockLogRepository();

        await mockLogRepository.saveLog(newLog);

        const logs = await mockLogRepository.getLogs(LogSeverityLevel.low)
        
        expect( logs ).toHaveLength( 1 );
        expect( logs[0] ).toBeInstanceOf( LogEntity )
    })

    


})