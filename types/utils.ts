export interface Result {
    type: boolean;
    message: string;
}

export interface ResultExtend extends Result {
    collectionId: string
}