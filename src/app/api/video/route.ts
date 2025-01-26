import { NextRequest, NextResponse } from "next/server";
import { createStreamVideo } from "yt-converter";


export const GET = async (req:NextRequest)=>{
    const url = req.nextUrl.searchParams.get("url");
    const itag = Number(req.nextUrl.searchParams.get("itag"));

    if(!url || !itag){
        return new NextResponse("Missing url or itag",{
            status:400
        })
    }

    const stream = await createStreamVideo({url,itag});

    const readableStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => {
            controller.enqueue(chunk); // Enviar chunk al cliente
          });

          stream.on('end', () => {
            controller.close(); // Terminar el stream
          });

          stream.on('error', (err) => {
            console.error('Stream error:', err);
            controller.error(err); // Manejar errores
          });
        },
      });

      // MKV file format
    return new Response(readableStream,{
        headers:{
            "Content-Type":"video/mp4",
            "Content-Disposition":"attachment"
        }
    })
}