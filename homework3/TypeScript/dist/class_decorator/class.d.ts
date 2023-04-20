declare function reportableClassDecorator<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        reportingURL: string;
    };
} & T;
declare class BugReport {
    type: string;
    title: string;
    constructor(t: string);
}
declare const bug: BugReport;
