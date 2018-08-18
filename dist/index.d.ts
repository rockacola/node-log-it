import * as loglevel from 'loglevel';
interface Options {
    level?: loglevel.LogLevelDesc;
    displayTimestamp?: boolean;
    displayName?: boolean;
    displayLevel?: boolean;
    useLevelInitial?: boolean;
    useLocalTime?: boolean;
    timestampFormat?: string;
}
declare class Logger {
    private name;
    private options;
    private logger;
    constructor(name: string, options?: Options);
    static readonly levels: loglevel.LogLevel;
    getName(): string;
    getLevel(): number;
    setLevel(level: loglevel.LogLevelDesc): void;
    trace(...argumentArray: any[]): void;
    debug(...argumentArray: any[]): void;
    info(...argumentArray: any[]): void;
    warn(...argumentArray: any[]): void;
    error(...argumentArray: any[]): void;
    private manipulateArguments;
    private getLevelLabel;
    private getTimestampLabel;
    private validateName;
    private validateLogLevel;
}
export default Logger;
