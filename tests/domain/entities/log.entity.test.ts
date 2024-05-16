import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('log.entity.ts', () => {
    
    const dataObj = {
        message:'Hello world',
        level: LogSeverityLevel.low,
        origin: 'log.entity.test.ts'
    }

    it('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( dataObj.message)
        expect(log.level).toBe( dataObj.level)
        expect(log.origin).toBe( dataObj.origin)
        expect(log.createdAt).toBeInstanceOf( Date )
    })

    it('should create a LogEntity instance from json', () => {
       const json = `{"level":"low","message":"Service https://www.google.com working","createdAt":"2024-05-16T19:04:40.656Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson( json )

        expect( log.message ).toBe( "Service https://www.google.com working" )
        expect( log.level ).toBe( "low" )
        expect( log.origin ).toBe( "check-service.ts" )
        expect( log.createdAt ).toBeInstanceOf( Date )
    })
    
    it('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject( dataObj )

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( dataObj.message)
        expect(log.level).toBe( dataObj.level)
        expect(log.origin).toBe( dataObj.origin)
        expect(log.createdAt).toBeInstanceOf( Date )
    })
})