import MovieCard from "./MovieCard";

const MovieList = ({title, list}) => {
  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll custom-scrollbar">
        <div className="flex">
          {list?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  )
}

export default MovieList;