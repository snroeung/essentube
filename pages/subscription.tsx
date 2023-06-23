import { NextPage } from "next";
import SubscribedChannelCircle from "../components/SubscribedChannelCircle";
import { useEffect, useState } from "react";
import SubscribedChannels from "./subscribedChannels";
import { Button } from "flowbite-react";

type SubscribedChannelsData = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
  contentDetails: {
    totalItemCount: number;
    newItemCount: number;
    activityType: string;
  };
};

type SubscribedChannelData = {
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
  id: string;
};

const Subscription: NextPage = () => {
  const [subscribedChannelsData, setSubscribedChannelsData] = useState<SubscribedChannelsData[] | null>(null);

  useEffect(() => {
    const fetchSubcribedChannelsData = async () => {
      const res = await fetch(`api/youtube/subscriptions/topSubscribedChannels`);
      const data = await res.json();

      setSubscribedChannelsData(data?.items);
    }
    fetchSubcribedChannelsData();
  }, []);

    const subscribedChannelsDataItems = subscribedChannelsData?.map((subscribedChannel: SubscribedChannelData) =>
      <SubscribedChannelCircle
        key={subscribedChannel.snippet.resourceId.channelId}
        channelName={subscribedChannel.snippet.title}
        profilePictureUrl={subscribedChannel.snippet.thumbnails.default.url}
        channelId={subscribedChannel.snippet.resourceId.channelId} />
    );


  return (
    <div>
      <div className="flex flex-row">
        <div className="flex flex-row overflow-x-auto content-center">
          {subscribedChannelsData &&
            subscribedChannelsDataItems
          }
        </div>
        <div className="flex items-center">
            <Button href="subscribedChannels">View All</Button>
        </div>
      </div>  
    </div>
  )
}

export default Subscription