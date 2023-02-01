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

    const data = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${apiKey}`, {
        method: 'GET',
        headers: {
            Accept: 'application.json',
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    });

    res.status(200).json(data);
  }