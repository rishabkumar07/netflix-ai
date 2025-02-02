import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const GPTMovieSuggestion = ()=> {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if(!movieNames)
    return null;
  
  if (movieNames?.length === 0) {
    return (
      <div className="pl-6 lg:pl-12 text-white bg-black">
        <h1 className="text-white font-bold text-lg lg:text-2xl rounded m-2">
          No movies found. Please try another search.
        </h1>
      </div>
    );
  }
  
  return (
    <div className="pl-6 lg:pl-12 text-white bg-black">
      {movieNames.map((name, index) => {
        if (movieResults?.[index]?.length > 0) {
          return (
            <div key={`${name}-${index}`} className="overflow-hidden">
              <h1 className="text-white font-bold text-lg lg:text-2xl rounded m-2">
                {name}
              </h1>
              <div className="flex w-fit overflow-x-auto scrollbar-hide pb-5 lg:pb-10">
                {movieResults[index].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  )
};

export default GPTMovieSuggestion;