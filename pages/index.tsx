import Head from 'next/head';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import QUERY_COUNTRIES from './CountriesQuery.graphql';

import styles from '../styles/Home.module.css';
import MovieCard, { Movie } from '../components/Cards';
import useDebounce from '../hooks/useDebounce';
import {
  Grid,
  TextField
} from "@material-ui/core/";

const Home = () => {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchField,setSearchField] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState("")
  const debouncedSearchTerm = useDebounce(searchField, 500);

  useEffect(() => {if(data && data.movies) setMovies(data.movies)}, [data])

  useEffect(() => {
    if(debouncedSearchTerm || searchField == "")
      setFilter(searchField)
  },[debouncedSearchTerm])
  console.log(searchField)
  // make sure all data is loaded
  if (loading) {
    return <p>loading...</p>;
  }

  // check for errors
  if (error) {
    return <p>:( an error happened</p>;
  }


  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>Movies NextJS + GraphQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Movies in San Francisco </h1>
      <div className={styles.searchField} >
        <TextField id="standard-basic" label="Search by movie title" fullWidth onChange={(event) => setSearchField(event.target.value)} />
      </div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {movies && (
          <>
            {movies.map((movie) => 
              movie.title.includes(filter) && (
              <>
                <Grid item xs={3} key={movie.title.indexOf(movie.title as string)}>
                  <MovieCard movie={movie as Movie}/>
                </Grid>
              </>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
}

export default Home;