import axios from "axios";
import { downloadAsync } from "expo-file-system";
import { historyItem } from "../Redux/features/stateHistory-slice";

export async function youtubeSearch(name: string) {
  let itemId = '';
  let newMusic: historyItem | null = null;


  // await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_KEY}&part=snippet&q=${name}&type=video&maxResults=1`)
  //   .then((res) => {
  //     itemId = res.data.items[0].id.videoId;
  //     if (itemId) {
  //       newMusic = { nameMusic: res.data.items[0].snippet.title, authorMusic: res.data.items[0].snippet.channelTitle, idMusic: res.data.items[0].id.videoId, isSelected: false };
  //     }
  //   });

  return newMusic;
}

export async function downloadApiMusic(itemId: string) {
  let uriItem = null;

  if (itemId) {
    //requisicao daonde vem o url pra baixar o som aqui (futuramente deve ser uma api de som sem copyright, se der certo!!)

    // await axios.request(options).then(
    //   async (res) => {
    //     if (res) {
    //       await downloadAsync(res.data.link, directoryYoutube + `${itemId}.mp3`).then(({ uri }) => {
    //         uriItem = uri;
    //       });
    //     }
    //   }
    // );

  }

  return uriItem;

}