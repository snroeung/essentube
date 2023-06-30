import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = {
};

interface Channel {
    id: string;
    snippet: {
      title: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
    };
  }

const secret = process.env.NEXT_AUTH_SECRET;
const apiKey = process.env.GOOGLE_API_KEY;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {  
    const token = await getToken({
        req, 
        secret});
    const accessToken = token?.accessToken;

    if (req.method === "GET") {
        try {
            const maxResults = 50;
            let allChannels: Channel[] = [];
            let nextPageToken = null;

            do {
                const data: Response =  await fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=contentDetails&part=snippet&mine=true&maxResults=${maxResults}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`, {
                headers: {
                Accept: 'application.json',
                Authorization: `Bearer ${accessToken}`
                }});

                const { items, nextPageToken: nextToken } = await data.json();
                allChannels = [...allChannels, ...items];
                nextPageToken = nextToken;

            } while (nextPageToken);

            res.status(200).json({ channels: allChannels });
            
            } catch (error) {
                console.error('Error fetching subscribed channels:', error);
                res.status(500).json({ error: 'Failed to fetch subscribed channels' });
            }
    }
}