import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Header: NextPage = () => {
  const [displayName, setDisplayName] = useState(" ");
  const [displayImageUrl, setDisplayImageUrl] = useState(" ");
  const { data: session, status } = useSession();

  const fetchDisplayName = async () => {
    if (session) {
      const res = await fetch('api/youtube/channel/account');
      const data = await res.json();
      setDisplayImageUrl(data?.items[0]['snippet']['thumbnails']['default']['url']);
      setDisplayName(data?.items[0]['snippet']['title'])
    }
  }

  useEffect(() => {
    fetchDisplayName();
  }, [session]);

  return (
    <Navbar
      className='bg-slate-800'
      fluid={true}
      rounded={true}

    >
      <Navbar.Brand href="https://flowbite.com/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Essentube
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          className='bg-slate-800 text-white'
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img={session ? displayImageUrl : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {displayName}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            {
              session ? <button onClick={() => signOut()}>Sign Out</button> :
                <button onClick={() => signIn("google")}>Sign In</button>
            }
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default Header

