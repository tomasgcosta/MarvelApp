export default interface ComicType {
    id: number,
    title: string,
    description: string,
    pageCount: number,
    resourceURI: string,
    characters: [{
        items: {
            name: string
        }
    }],
    thumbnail: {
        path: string,
        extension: string
    }
    creators: [{
        items: {
            name: string
        }
    }]
}