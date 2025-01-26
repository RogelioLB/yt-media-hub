"use server"
import { getInfo } from "yt-converter";

export const maxDuration = 300;

export const getInfoVideo = async (url: string) => {
  const data = await getInfo(url);
  //transform seconds to minutes:seconds format
  const duration = new Date(Number(data.lengthSeconds) * 1000).toISOString().substr(11, 8);
  //filtar all the formats that is repeated and show only one of each type, and not have qualityLabel
  const audio = data.formatsAudio.filter((format, index, self) => self.findIndex(t => t.audioBitrate === format.audioBitrate && t.audioBitrate !== undefined) === index && format.audioBitrate !== undefined);
  const video = data.formatsVideo.filter((format, index, self) => self.findIndex(t => t.qualityLabel === format.qualityLabel && t.qualityLabel !== undefined) === index && format.audioQuality === undefined);
  console.log(audio)
    return {
    title: data.title,
    thumbnail: data.thumbnails[2].url,
    duration: duration,
    views: data.viewCount,
    author: data.author.name,
    audio: audio,
    video: video
  }
}