import * as Task from 'vsts-task-lib';

export class Helper {
    constructor() {}

    static WriteConsoleInformation(message: string, debug: boolean = false): void {
        console.info(message);
        if (debug) {
            Task.debug(message);
        }
    }

    static WriteConsoleError(message: string): void {
        console.error(message);
        Task.error(message);
    }
}