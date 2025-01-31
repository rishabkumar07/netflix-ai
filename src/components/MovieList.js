import MovieCard from "./MovieCard";

const MovieList = ({title, list}) => {
  return (
    <div>
      <h1 className="ml-6 lg:ml-12 text-white font-bold text-md sm:text-lg md:text-xl lg:text-2xl rounded">
        {title}
      </h1>
      <div className="slider">
        <div className="slide flex mt-2 mb-14">
          {list?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          {list?.map((movie) => <MovieCard key={`replica-${movie.id}`} movie={movie} />)}
        </div>
      </div>
    </div>
  )
}

export default MovieList;