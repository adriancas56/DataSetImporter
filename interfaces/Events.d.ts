export {}

declare global {
    interface IEventsItem {
        _id: string,
        filename: string,
        username: string, 
        categoryId: string,
        categoryName: string,
        executionType: string, 
        warnings: string[],
        error : string, 
        creationTime : string
    }
}
