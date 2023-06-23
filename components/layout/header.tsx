import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const Header: NextPage = () => {
  const [displayImageUrl, setDisplayImageUrl] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBarVisible = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  }

  useEffect(() => {
    const fetchDisplayData = async () => {
      const res = await fetch(`api/youtube/channel/account`);
      const data = await res.json();
  
      if (!data.error) {
        setDisplayImageUrl(data?.items[0]['snippet']['thumbnails']['default']['url']);
        }
      }
    fetchDisplayData();
  }, [displayImageUrl]);

  return (
    <Navbar
      className='bg-slate-800 sticky top-0'
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Essentube
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {isSearchBarVisible ? <SearchBar/> : null}
        <Button className="boarder-none cursor-pointer appearance-none bg-inherit p-0" onClick={toggleSearchBarVisible}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Button>
        <Button href="/settings" className="boarder-none cursor-pointer appearance-none bg-inherit p-0">
          <Avatar alt="User avatar" img={displayImageUrl} rounded={true} />
        </Button>
      </div>
    </Navbar>
  );
}

export default Header

