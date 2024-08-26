const GPTSearchBar = ()=> {
  return (
    <div className="pt-[10%] w-1/2 bg-black grid grid-cols-12">
      <input type="text" placeholder="What would you like to watch today?" 
       className="p-4 m-4 col-span-9"></input>
      <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">Search</button>
    </div>
  )
};

export default GPTSearchBar;