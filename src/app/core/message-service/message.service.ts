import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { BaseMessage } from './messages/base.message';


export class MessageService {
    private subject: Subject<BaseMessage>;

    constructor() {
        this.subject = new Subject();
    }

    public publish(message: BaseMessage) {
        this.subject.next(message);
    }

    public getMessageOf<T extends BaseMessage>(messageType: new(...args: any[]) => T): Observable<T> {
        return this.subject.filter((message) => {
            return (message.constructor as any).name === (messageType as any).name;
        }) as any;
    }

}


