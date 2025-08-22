export const TMDB_CONFIG ={
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_ACCESS_TOKEN}`
    }
}


export const fetchMovies = async ({query}: {query: string}) =>{
    const endpoint = query 
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if(!response.ok){
        //@ts-ignore
        throw new Error("Failed to fetch movies", response.statusText)
    }

    const data = await response.json();
    return data.results;
}
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NThjYWIwNWMyNmVjMjM1YmExZGM0ZWY5NjY0NTc5MiIsIm5iZiI6MTc1NTg2NDM0MS4xMDIwMDAyLCJzdWIiOiI2OGE4NWQxNTFmNTZmMjY1MDE2MGRiMGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QsqdQhMSN8YdPedray_SHncyKFlgTWZ_xywzdffnUvs'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));