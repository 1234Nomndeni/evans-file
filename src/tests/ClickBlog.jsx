import React, { useState } from 'react'

const ClickBlog = ({displayName, blogHeader, blogBody}) => {
    const [currentPost, setCurrentPost] = useState()

  return (
    <div className='mt-20'>
        <h1>Am the selected Item</h1>
        <p>
            {blogBody}
        </p>

    </div>
  )
}

export default ClickBlog