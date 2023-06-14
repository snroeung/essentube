import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = {
};

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
            const data = await fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&mine=true&key=${apiKey}`, {
            headers: {
            Accept: 'application.json',
            Authorization: `Bearer ${accessToken}`
            }});
            if (!data.ok) {
                throw new Error('Failed to fetch data from the YouTube API');
              }
              const jsonData = await data.json();
              res.status(200).json(jsonData);
            } catch (error) {
              res.status(500).json({ error: 'Failed to fetch YouTube data' });
            }
          } else {
            // Handle unsupported request methods
            res.status(405).json({ error: 'Method Not Allowed' });
          }
        };