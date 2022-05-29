import React, { useState, useEffect, ChangeEvent } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import algoliasearch from 'algoliasearch'
// import { InstantSearch, SearchBox, Hits } from '@types/react-instantsearch-dom'
import { db } from "../../utils/firebase";
import Feed from "../Feed";
// @ts-ignore
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY!
)

const searchIndex = searchClient.initIndex('posts')

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [articles, setArticles] = useState([] as any);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value)

  const handleSearch = async (queryText: string) => {
    const result = await searchIndex.search(queryText)
    setSearchResult(result.hits)
  }

  useEffect(() => {
    if (!searchText) setSearchResult(null)
  }, [searchText])

  useEffect(() => {
    const unsubcribe = db.collection('posts').onSnapshot({
      next: (snapshots) => {
        const data = snapshots.docs.map((doc) => {
          const post = {
            id: doc.id,
            ...doc.data(),
          }

          return post
        })

        setArticles(data)
      },
      error: (error) => console.log(error),
    })

    return () => unsubcribe()
  }, [])

  return (
    <main>
        <InstantSearch searchClient={searchClient} indexName='posts'>
      <section className="top-0 relative">
        <form className="flex space-x-9 items-center border border-purple-600 rounded-full pr-4">
          {/* <input
            value={searchText}
            onChange={handleSearchText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(searchText)
            }}
            type="text"
            className="rounded-full p-2 ml-4 text-sm focus:outline-none w-100 h-11 w-full "
            placeholder="Search topic..."
          /> */}
           
          {/* <SearchIcon className=" block h-5 w-5 mr-10 cursor-pointer" /> */}
          {/* <button type="submit" hidden/> */}
          <SearchBox className="rounded-full p-1 ml-4 text-sm h-11 w-full" />
        </form>
      </section>
      <Hits hitComponent={Hit} /> 
       {!articles || articles.length === 0 ? (
          <div className="bg-white hidden w-4/6 ml-0 absolute mt-3">
            <div className="pt-3 p-2">

            No product.
            </div>
          </div>
        ) : (
          <div className="hidden lg:w-full absolute mt-3 h-screen -ml-64 sm:w-full bg-white">
            <h1>Hello world</h1>
            {articles?.map((post: any) => (
              <div className='' key={post.id}>
                {/* <img src={prod.image} alt={prod.id} width={200} /> */}
                <h3>{post.blogHeader}</h3>
                {/* <p>{post.displayName}</p> */}
              </div>
            ))}
          </div>
        )}

      {/* <Feed/> */}
       {/* <div className=''>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((prod: any) => (
            <div className='content' key={prod.objectID}>
              <img src={prod.image} alt={prod.id} width={200} />
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
            </div>
          ))
        ) : !articles || articles.length === 0 ? (
          <div className="bg-white w-4/6 ml-0 absolute mt-3">
            <div className="pt-3 p-2">

            No product.
            </div>
          </div>
        ) : (
          articles?.map((prod: any) => (
            <div className='content' key={prod.id}>
              <img src={prod.image} alt={prod.id} width={200} />
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
            </div>
          ))
        )} 
      </div> */}
      </InstantSearch>
    </main>
  );
};

export default SearchBar;

 const Hit = ({ hit }: { hit: any}) => {
  return (
    <div className='content' key={hit.id}>
      <img key={hit.id} src={hit.image} alt={hit.id} width={200} />
      <h3>{hit.title}</h3>
      <p>{hit.description}</p>
    </div>
  )
}