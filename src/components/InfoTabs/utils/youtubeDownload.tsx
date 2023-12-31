import axios from "axios";
import { AVPlaybackSource } from "expo-av";
import { downloadAsync, documentDirectory } from "expo-file-system";

export async function youtubeDownload(name: string): Promise<AVPlaybackSource | null> {
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
        'X-RapidAPI-Key': '380f0a120fmsh9db4624704953e3p16a058jsnfcd51260c4cf',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    console.log('salve');

    await axios.request(options).then(
      async (res) => {
        console.log(res.data.link)
        if (res) {
          await downloadAsync(res.data.link, documentDirectory + `${res.data.title}.mp3`).then(({ uri }) => {
            console.log(uri)
            uriItem = uri;
          });
        }
      }
    );

  }

  return uriItem;

}