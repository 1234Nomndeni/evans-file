import React from 'react'

const UseLocalStorage = () => {
    const getLocalStorage = () => {
        const local = localStorage.getItem(name)
        if(local != null){
            return JSON.parse(local)
        }
    }
  return (
    <div>UseLocalStorage</div>
  )
}

export default UseLocalStorage