export default interface CharacterType {
    id: string,
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    comics: {
        available: number,
        items: [{
            resourceURI: string,
            name: string
        }]
    }

}