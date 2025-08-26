import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {

  const [searchTerm, setSearchTerm] = React.useState('')
  const {data:movies, loading: moviesLoading, error: moviesError, refetch: refetchMovies, reset } = useFetch(()=> fetchMovies({
    query: searchTerm
  }),false)

  useEffect( () =>{
    const timeoutId = setTimeout( async () => {
      if(searchTerm.trim()){
        await refetchMovies();
      }else {
        reset();
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={
          {paddingBottom: 100}
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar 
              placeholder='Search movies...'
              value={searchTerm}
              onChangeText={(text:string) => setSearchTerm(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' className='mt-10 self-center'/>
            )}
            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>Error: {moviesError?.message}</Text>
            )}

            {!moviesLoading && !moviesError && searchTerm.trim().length > 0 && movies?.length > 0 && (
              <Text className='text-white text-xl font-bold'>
                Showing results for {' '}
                <Text className='text-accent'>{searchTerm}</Text>
              </Text>
            )}

          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ?(
            <View className='mt-10 px-5'>
              <Text className='text-gray-500 text-center'>
                {searchTerm.trim() ? 'No movies found' : 'Please enter a movie to search'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search