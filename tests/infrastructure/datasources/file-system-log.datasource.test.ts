import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('file-system.datasource.ts', () => {
    
    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        try {
            if (fs.existsSync(logPath))
                fs.rmSync(logPath, { recursive: true, force: true });
        } catch (err) {
            console.error('Error while removing directory:', err);
        }
    })
    
    it('should create log files if they do not exist', () => {
        new FileSystemDatasource();

        const files = fs.readdirSync( logPath )

        expect(files).toEqual(  [ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ] )
    })
    
    
    it('should save a log in logs-all.log', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
            message: 'test message'
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');

        expect( allLogs ).toContain( JSON.stringify(log) )
    })
   
    it('should save a log in logs-all.log and logs-medium.log', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
            message: 'test message'
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8');

        expect( allLogs ).toContain( JSON.stringify(log) )
        expect( mediumLogs ).toContain( JSON.stringify(log) )
    })
 
    it('should save a log in logs-all.log and logs-high.log', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
            message: 'test message'
        })

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8');

        expect( allLogs ).toContain( JSON.stringify(log) )
        expect( highLogs ).toContain( JSON.stringify(log) )
    })
 
    it('should return all logs', async () => {
        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            origin: 'low',
            message: 'low-log'
        }) 
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            origin: 'medium',
            message: 'medium-log'
        }) 
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            origin: 'high',
            message: 'high-log'
        })

        await Promise.all([
            logDatasource.saveLog(logLow),
            logDatasource.saveLog(logMedium),
            logDatasource.saveLog(logHigh),
        ]);
        
        const [logsLow, logsMedium, logsHigh] = await Promise.all([
            logDatasource.getLogs(LogSeverityLevel.low),
            logDatasource.getLogs(LogSeverityLevel.medium),
            logDatasource.getLogs(LogSeverityLevel.high),
        ]);

        expect(logsLow).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) )
        expect(logsMedium).toEqual( expect.arrayContaining([ logMedium ]) )
        expect(logsHigh).toEqual( expect.arrayContaining([ logHigh ]) )
    })

    test('should throw an error if severity level is not defined', async() => {

        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;
    
        try {
          await logDatasource.getLogs(customSeverityLevel);
          expect(true).toBeFalsy();
        } catch (error) {
          const errorString = `${ error }`;
          
          expect(errorString).toContain(`${ customSeverityLevel } not implemented`);
        }
    
    })
   
})