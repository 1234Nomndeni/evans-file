import algoliasearch from "algoliasearch/lite";
import React, { useState } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Disclosure } from "@headlessui/react";

import { Hit } from "./Hit";

export const searchClient = algoliasearch(
  // "76XR8OWBS9",
  // "4400ad229e3d21b528113a2187e45eec",

  "VS5Z5QH2XO",
  "0f6b1ec360f85d698d5eed8e29d9e793"

  // process.env.REACT_APP_ALGOLIA_APP_ID,
  // process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toogle = () => {
    setIsOpen(isOpen);
  };

  return (
    // <Disclosure>
    //   {({ open }) => {
    <main className="w-5/6 mx-auto absolute ">
      {/* <Disclosure.Panel> */}
      <InstantSearch indexName={"melbite_search"} searchClient={searchClient}>
        <SearchBox
          className={
            !isOpen
              ? "rounded-full p-1 pr-4 pl-4 ml-4 text-sm h-11 w-2/5 border border-purple-600"
              : "rounded-full p-1 pr-4 pl-4 ml-4 text-sm h-11 w-2/5 border border-purple-600"
          }
          onClick={toogle}
        />
        <section className="mt-4 h-44 min-h-screen -ml-64 -mr-20 pb-4 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100 overflow-y-scroll">
          <section className="flex mx-wd1 justify-between items-center mt-2 mx-auto">
            <button className="bg-purple-500 hover:bg-purple-400 text-white px-5 py-2 rounded-sm font-bold text-sm">
              TOP
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-sm font-bold text-sm">
              Close
            </button>
          </section>
          <Hits hitComponent={Hit} />
        </section>
      </InstantSearch>
      {/* </Disclosure.Panel> */}
    </main>
    // }}
    // </Disclosure>
  );
};

export default Search;
