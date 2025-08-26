import {Client, Databases, ID, Query} from 'react-native-appwrite'

// track the searches made by a user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;


const client = new Client()
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => { 
    
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", query.trim())]
        );


    if(result.documents.length > 0){
        const existingMovie = result.documents[0];

        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1,
                movie_id: movie.id,
            }
        )
    }
    else{
        await database.createDocument({
            databaseId: DATABASE_ID,
            collectionId: COLLECTION_ID,
            documentId: ID.unique(),
            data: {
                searchTerm: query.trim(),
                count: 1,
                title: movie.title,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
        })
    }
    } catch (error) {
        console.log("Error updating search count", error);
        throw error;
    }
    // check if a record of that search has already been stored.
    // if so then it increases the count
    // if not then it creates a new record
     // update it's count to 1.
}