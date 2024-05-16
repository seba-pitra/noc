import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';


describe('check-service.ts', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks()
    })


    it('should call successCallback when fetch returns true', async () => {
        const wasOk = await checkService.execute('https://google.com')

        expect( wasOk ).toBeTruthy()
        expect( successCallback ).toHaveBeenCalled()
        expect( errorCallback ).not.toHaveBeenCalled()
        
        
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )
    })


    it('should call errorCallback when fetch returns false', async () => {
        const wasOk = await checkService.execute('https://asdasdsada sad12312.com')

        expect( wasOk ).toBeFalsy()
        expect( errorCallback ).toHaveBeenCalled()
        expect( successCallback ).not.toHaveBeenCalled()
        
        
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )
    })
})