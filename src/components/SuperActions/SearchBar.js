import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [contentFilter, setContentFilter] = useState([]);

    useEffect(() => {
        const fetchPostData = () => {
          
        }
        fetchPostData()
    }, [])
  return (
    <main>
        <section>
            <div className="flex space-x-9 items-center border rounded-full pr-4">
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="text"
                      className="rounded-full p-2 ml-4 text-sm focus:outline-none w-100 h-11 w-full "
                      placeholder="Search topic..."
                    />
                    <SearchIcon className=" block h-5 w-5 mr-10 cursor-pointer" />
                  </div>
        </section>

    </main>
  )
}

export default SearchBar