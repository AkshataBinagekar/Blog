import React from 'react'
import Post from '../../components/Post/Post'
import './Recipe.css'
import Topbar from '../../components/topbar/Topbar'
function Recipe() {
  return (
    <div className='recipe'>
    <Topbar />
      <Post />
    </div>
  )
}

export default Recipe
