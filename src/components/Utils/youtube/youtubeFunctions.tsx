import axios from "axios";
import { downloadAsync } from "expo-file-system";
import { YOUTUBE_KEY, GOOGLE_KEY } from '@env';
import { directoryYoutube } from "../globalVars";
import { historyItem } from "../Redux/features/stateHistory-slice";

export async function youtubeSearch(name: string){
  let itemId = '';
  let newMusic: historyItem | null = null;

  await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_KEY}&part=snippet&q=${name}&maxResults=1`)
    .then((res) => {
      itemId = res.data.items[0].id.videoId;
      if(itemId){
        newMusic = {nameMusic: res.data.items[0].snippet.title, authorMusic: res.data.items[0].snippet.channelTitle, idMusic: res.data.items[0].id.videoId, isSelected: false};
      }
    });

  return newMusic;
}

export async function youtubeDownload(itemId: string){
  let uriItem = null;

  if (itemId) {
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: itemId },
      headers: {
        'X-RapidAPI-Key': YOUTUBE_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    await axios.request(options).then(
      async (res) => {
        if (res) {
          await downloadAsync(res.data.link, directoryYoutube + `${itemId}.mp3`).then(({ uri }) => {
            uriItem = uri;
          });
        }
      }
    );

  }

  return uriItem;

}