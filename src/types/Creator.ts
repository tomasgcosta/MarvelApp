export default interface CreatorType {
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    thumbnail: {
        path: string,
        extension: string,
    }
    stories: {
        available: number
        storySummary: {
            resourceUrl: string,
            name: string,
            type: string
        }
    }
    
}
