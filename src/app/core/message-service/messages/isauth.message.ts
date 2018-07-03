import { BaseMessage } from './base.message';

export class IsAuthMessage extends BaseMessage {
    constructor (public readonly isAuthorized: boolean) {
        super();
    }
}

