import axios from "axios";
import { downloadAsync } from "expo-file-system";
import { API_KEY } from '@env';
import { directoryYoutube } from "../globalVars";

export async function youtubeDownload(name: string): Promise<string | null> {
  const key = 'AIzaSyBx4fNjPu622u_lezynCUheurIszLPuB3k';
  let itemId = '';
  let uriItem = null;

  await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&q=${name}&maxResults=1`)
    .then((res) => itemId = res.data.items[0].id.videoId);

  if (itemId) {
    

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: itemId },
      headers: {
        'X-RapidAPI-Key': API_KEY,
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