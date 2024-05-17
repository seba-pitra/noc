import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('log.repository.impl.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockRepository)

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    it('saveLog should call the datasource with arguments', () => {
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.repository.impl.test.ts'
        })

        logRepository.saveLog(log);

        expect(mockRepository.saveLog).toHaveBeenCalledWith( log )
    })
    
    it('getLogs should call the datasource with arguments', () => {
        logRepository.getLogs( LogSeverityLevel.low );
    
        expect(mockRepository.getLogs).toHaveBeenCalledWith( LogSeverityLevel.low )
    })

})