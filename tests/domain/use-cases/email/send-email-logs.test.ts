import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';



describe('send-email-log.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }
    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    it('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute('sebastian.pitra10@gmail.com')

        expect( result ).toBeTruthy()
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1)
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent successfully",
            "origin": "send-email-logs.ts",
        })
    })
    
    it('should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const result = await sendEmailLogs.execute('sebastian.pitra10@gmail.com')

        expect( result ).toBeFalsy()
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes( 1 )
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email Log was not sent",
            "origin": "send-email-logs.ts",
        })
    })
})