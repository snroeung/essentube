import { Card } from "flowbite-react";
import { NextPage } from "next";
import Image from "next/image";

const SubscribedChannelCircle: NextPage<{ channelName: string, profilePictureUrl: string; channelId: string }> = ({ channelName, profilePictureUrl, channelId }) => {
    const channelUrl: string = `https://youtube.com/channel/${channelId}`;
    return (
    <Card className="bg-transparent border-none">
        <div className="flex flex-col items-center pb-10">
          <Image
            alt="image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src = {profilePictureUrl}
            width="96"
          />
          <h5 className="mb-1 text-xl font-medium text-white truncate">
            <a href={channelUrl}>{channelName}</a>
          </h5>
        </div>
      </Card>);
}

export default SubscribedChannelCircle