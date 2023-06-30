import { NextPage } from "next";
import { useEffect, useState } from "react";
import SubscribedChannelListItem from "../components/SubscribedChannelListItem";
import { Button } from "flowbite-react";
import { SubscribedChannelData, SubscribedChannelsData } from "../types/SubscriptionTypes";

const SubscribedChannels: NextPage = () => {
    const [subscribedChannelsData, setSubscribedChannelsData] = useState<SubscribedChannelsData[] | null>(null);

    useEffect(() => {
        const fetchSubcribedChannelsData = async () => {
            const res = await fetch(`api/youtube/subscriptions/subscribedChannels`);
            const data = await res.json();

            setSubscribedChannelsData(data?.channels);
        }
        fetchSubcribedChannelsData();
    }, []);

    const subscribedChannelsDataItems = subscribedChannelsData?.map((subscribedChannel: SubscribedChannelData) =>
        <SubscribedChannelListItem
            key={subscribedChannel.snippet.resourceId.channelId}
            channelName={subscribedChannel.snippet.title}
            profilePictureUrl={subscribedChannel.snippet.thumbnails.default.url}
            channelId={subscribedChannel.snippet.resourceId.channelId} />
    );

    return (
        <div className="flex flex-col h-screen">
            <Button href="subscription">BACK</Button>
            <div className="flex-grow overflow-y-auto">
                { subscribedChannelsData && subscribedChannelsDataItems }
            </div>
        </div>
    );
};

export default SubscribedChannels