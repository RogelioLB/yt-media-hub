import { getInfoVideo } from "@/actions/get-info-video";
import { NextRequest } from "next/server"


export const maxDuration = 300;

export const POST = async (req:NextRequest)=>{
    const {url} = await req.json()
    const data = await getInfoVideo(url);
    return new Response(JSON.stringify(data),{
        headers:{
            "Content-Type":"application/json"
        }
    })
}