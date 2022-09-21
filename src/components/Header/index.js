

import React, { useState } from 'react';
import './Header.scss';


function Header({path,searchKey, searchMovies}) {

  const [inputSearch, setInputSearch] = useState('');

  

  return (
     <header className="header">
        <div className="logo">
          <img src={path} alt='photo'/>
        </div>
        <form className='search' onSubmit={searchMovies}>
          <input type="text" placeholder='Search...' onChange={e=>setInputSearch(e.target.value)}/>
          <input type="submit" />
        </form>
     </header>
  );
}

export default Header