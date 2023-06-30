import { Card } from "flowbite-react";
import { NextPage } from "next";
import Image from "next/image";

const SubscribedChannelListItem: NextPage<{ channelName: string, profilePictureUrl: string; channelId: string }> = ({ channelName, profilePictureUrl, channelId }) => {
    const channelUrl: string = `https://youtube.com/channel/${channelId}`;
    return (
    <Card className="bg-transparent border-none">
        <div className="flex flex-row items-center">
          <Image
            alt="image"
            className="mb-3 rounded-full shadow-lg"
            height="36"
            src = {profilePictureUrl}
            width="36"
          />
          <h5 className="mx-3 text-xl font-medium text-white truncate">
            <a href={channelUrl}>{channelName}</a>
          </h5>
        </div>
      </Card>);
}

export default SubscribedChannelListItem