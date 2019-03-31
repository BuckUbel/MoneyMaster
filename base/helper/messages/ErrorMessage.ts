import {IMessage} from "./Message";

export interface IErrorMessage extends IMessage {
    errorMsg: string;
}

export class ErrorMessage implements IErrorMessage {
    public readableText: string;
    public errorMsg: string;

    public constructor(readableText: string, errorMsg?: string) {
        this.readableText = readableText;
        this.errorMsg = errorMsg;
    }
}