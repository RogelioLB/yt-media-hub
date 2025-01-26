"use client"
import React, { useState } from "react";
import { Search, Video, Music, Terminal, Code, Info } from "lucide-react";
import { videoFormat } from "@distube/ytdl-core";
export const DownloadCard = () => {
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{
    title: string;
    duration: string;
    author: string;
    thumbnail: string;
    audio: videoFormat[];
    video: videoFormat[];
  }>();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
      const videoInfo : {
        title: string;
        duration: string;
        author: string;
        thumbnail: string;
        audio: videoFormat[];
        video: videoFormat[];
      } = await fetch("/api/info",{method:"POST",body:JSON.stringify({url}),headers:{"Content-Type":"application/json"}}).then(res=>res.json());
      setVideoInfo({
        title: videoInfo.title,
        duration: videoInfo.duration,
        author: videoInfo.author,
        thumbnail: videoInfo.thumbnail,
        audio: videoInfo.audio,
        video: videoInfo.video
      });
      setIsLoading(false);
  };
  return (
    <div className="w-full max-w-4xl mx-auto space-y-16">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === "video" ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
          >
            <Video className="w-5 h-5 mr-2" />
            Video
          </button>
          <button
            onClick={() => setActiveTab("audio")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === "audio" ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
          >
            <Music className="w-5 h-5 mr-2" />
            Audio
          </button>
        </div>
        <form onSubmit={(e)=>handleSubmit(e)} className="w-full">
          <div className="relative">
            <input
              type="url"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching video information...</p>
          </div>
        )}
        {videoInfo && !isLoading && (
          <div className="mt-6">
            <div className="flex items-start space-x-4">
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{videoInfo.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Duration: {videoInfo.duration} • {videoInfo.author}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {activeTab === "video" ? (
                    <>
                    {videoInfo.video.map((format,index)=>{
                      return <a download={`${videoInfo.title}.mp4`} href={`/api/video?url=${url}&itag=${format.itag}`} key={index} className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800">
                        {format.qualityLabel} () ({(Number(format.contentLength) / 1000000).toFixed(2)} MB)
                      </a>
                    })}
                    </>
                  ) : (
                    <>
                    {videoInfo.audio.map((format,index)=>{
                      return <a download={`${videoInfo.title}.mp3`} href={`/api/audio?url=${url}&itag=${format.itag}`} key={index} className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800">
                        {format.audioBitrate} kbps ({(Number(format.contentLength) / 1000000).toFixed(2)} MB)
                      </a>
                    })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-medium mb-4 flex items-center text-black">
            <Terminal className="w-6 h-6 mr-2" /> Installation
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
            npm install yt-converter
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-medium mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2" /> Usage Example
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
            <pre>{`import YTConverter from 'yt-converter';
// Initialize converter
const converter = new YTConverter();
// Download video
const downloadVideo = async (url) => {
  try {
    const info = await converter.getInfo(url);
    const stream = await converter.downloadVideo(url, {
      quality: 'high' // or 'low'
    });
    // Handle the stream...
  } catch (error) {
    console.error('Download failed:', error);
  }
};
// Download audio
const downloadAudio = async (url) => {
  try {
    const stream = await converter.downloadMP3(url);
    // Handle the stream...
  } catch (error) {
    console.error('Download failed:', error);
  }
};`}</pre>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-medium mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" /> How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">1. URL Processing</h3>
              <p className="text-gray-600 text-sm">
                The package extracts video ID and validates the YouTube URL
                format.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">2. Format Selection</h3>
              <p className="text-gray-600 text-sm">
                Choose between various video qualities or audio formats for
                download.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">3. Download Stream</h3>
              <p className="text-gray-600 text-sm">
                Creates a readable stream for efficient file downloading.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
