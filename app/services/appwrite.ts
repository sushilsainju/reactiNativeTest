import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const appwriteClient = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const database = new Databases(appwriteClient);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    console.log("HERE Search count updated successfully:", query, movie);

    // Check if the search document already exists in the collection
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (response.documents.length > 0) {
      // If it exists, update the count
      const existingDoc = response.documents[0];
      const updatedCount = existingDoc.count + 1;
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDoc.$id,
        {
          count: updatedCount,
        }
      );
    } else {
      // If it doesn't exist, create a new document
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        posterUrl: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : null,
      });
    }

    console.log("Search count updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to update search count:", error);
    throw error;
  }
};

export const getTrendingSearches = async (): Promise<TrendingMovie[]> => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(10),
    ]);

    // Map the documents to the TrendingMovie interface
    const trendingMovies: TrendingMovie[] = response.documents.map((doc) => ({
      searchTerm: doc.searchTerm,
      movie_id: doc.movie_id,
      title: doc.title,
      count: doc.count,
      poster_url: doc.posterUrl,
    }));

    return trendingMovies;
  } catch (error) {
    console.error("Failed to fetch trending searches:", error);
    throw error;
  }
};
