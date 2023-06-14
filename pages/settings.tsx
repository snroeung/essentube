import { NextPage } from "next";
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";

const Settings: NextPage = () => {
  const { data: session, status } = useSession();
  const [displayName, setDisplayName] = useState("");
  const [displayImageUrl, setDisplayImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg");

  useEffect(() => {
    const fetchDisplayData = async () => {
      const res = await fetch(`api/youtube/channel/account`);
      const data = await res.json();
  
      if (!data.error) {
        setDisplayName(data?.items[0]['snippet']['title']);
        setDisplayImageUrl(data?.items[0]['snippet']['thumbnails']['default']['url']);
      }
  
      localStorage.setItem("userDisplayImageUrl", displayImageUrl);
    }
    fetchDisplayData();
  }, [displayName, displayImageUrl]);

  const handleSignOut = () => {
    signOut();
    localStorage.clear();
  }

  return (
    <div>
      <main className={styles.main}>
        <Card>
          <Avatar alt="User avatar" img={displayImageUrl} rounded={true} />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {displayName}
          </h5>
          {
            session ? <Button onClick={() => handleSignOut()}>Sign Out</Button> :
              <Button onClick={() => signIn("google")}>Sign In</Button>
          }
        </Card>
      </main>
    </div>
  )
}

export default Settings

