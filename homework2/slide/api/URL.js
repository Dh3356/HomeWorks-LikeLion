const getURL = (AlbumId) => {
    if(AlbumId === Number)
    {
        return `https://jsonplaceholder.typicode.com/albums/${AlbumId}/photos`;
    }
}

export default getURL;