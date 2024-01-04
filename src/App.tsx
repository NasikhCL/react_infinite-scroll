// import { useState } from 'react'
import { useCallback, useRef, useState } from "react";
import useBookSearch from "./useBookSearch";


function App() {

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1)
  const handleSearch=(e)=>{
    setQuery(e.target.value);
    setPageNumber(1);
  }
  const { loading, hasMore, books, error} = useBookSearch(query, pageNumber)
  
  const observer = useRef();
  const lastBookElementBook = useCallback(node=>{
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prev=> prev+1);

        console.log('visible')
      }
    })
    if(node) observer.current.observe(node)
    console.log(node)
  },[loading, hasMore])

  return (
    <div className="mx-32 p-3 border">
    <input className="border rounded" value={query} onChange={handleSearch} type="text" name="" id="" />
    {books && books.map((book, index)=>{
      if(books.length === index +1 ){
        return <div ref={lastBookElementBook} key={book}>{book}</div>
      }else{
        return <div key={book}>{book}</div>

      }
    })}
    <div>{loading && 'loading...'}</div>
    <div>{error && 'error!'}</div>
    </div>
  )
}

export default App
