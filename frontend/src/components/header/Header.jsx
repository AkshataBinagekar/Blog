import React from 'react'
import './Header.css'
function Header() {
  return (
 
    <div className="header">
    <div className="headerTitles">
      <span className="headerTitleSm">Welcome To</span>
      <span className="headerTitleLg"> Recipe Blog</span>
    </div>
    <img
      className="headerImg"
      // src="https://i.pinimg.com/474x/1f/df/80/1fdf8091124aee432722cc92a151dade.jpg"
      src="https://i.pinimg.com/474x/09/51/6b/09516b94d6e91a94faee7c817cc66f50.jpg"
      alt=""
    />
    <p className='quote'>
"Explore a world of flavors and culinary adventures on our recipe blog – your ultimate destination for delicious dishes, cooking inspiration, and kitchen tips!"</p>
  </div>

  )
}

export default Header
