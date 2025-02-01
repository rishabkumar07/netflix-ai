import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const GPTMovieSuggestion = ()=> {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) 
    return null;
  
  return (
    <div className="pl-6 lg:pl-12 text-white bg-black">
      {movieNames.map((name, index) => (
        <div key={index} className="overflow-hidden">
          <h1 className="text-white font-bold text-lg lg:text-2xl rounded m-2">
            {name}
          </h1>
          
          <div className="flex w-fit pb-5 lg:pb-10">
            {movieResults.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

export default GPTMovieSuggestion;