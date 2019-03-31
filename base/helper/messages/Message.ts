export interface IMessage {
    readableText: string;
}

export class Message implements IMessage {
    public readableText: string;

    public constructor(readableText: string) {
        this.readableText = readableText;
    }
}
