## Media Timer: Política de Privacidade

Bem vindo ao Media Timer, aplicativo para android!

Esse é um aplicativo temporizador desenvolvido por Henrique de Albuquerque Mascarin e visa resolver um problema pessoal.

### Dados coletados pelo aplicativo 

Nenhum dado é coletado. Tudo fornecido como dados de arquivos, histórico de áudios e configurações de tema são todos mantidos no aplicativo.

A lista de permissões listadas a baixo são encontradas aqui no [AndroidManifest.xml](https://github.com/HenriqueAMascarin/MediaTimer/blob/main/android/app/src/main/AndroidManifest.xml#L2-L7).

<br/>

| Permissão | Porque é necessária |
| :---: | --- |
| `android.permission.INTERNET` `com.google.android.gms.permission.AD_ID` | Utilizados para mostrar o anúncio de baixo na tela principal. |
| `android.permission.READ_EXTERNAL_STORAGE` `android.permission.WRITE_EXTERNAL_STORAGE` `android.permission.READ_MEDIA_AUDIO`| Utilizados para ler áudios que a pessoa seleciona do seu dispositivo ou que estão salvos no histórico. |
| `android.permission.SYSTEM_ALERT_WINDOW` | Utilizado para mostrar as notificações do aplicativo, quando está executando o temporizador. |
| `android.permission.DOWNLOAD_WITHOUT_NOTIFICATION` | Utilizado para encontrar o local do arquivo selecionado na aba de histórico. |
| `android.permission.MODIFY_AUDIO_SETTINGS` | Utilizado com a tecnologia EXPO Audio, para configurar os áudios usados no aplicativo. |

Caso tenha visto alguma permissão que não esteja listada aqui ou sobre qualquer dúvida de segurança, se sinta livre em mandar uma mensagem ao e-mail: henriqueamascarin@gmail.com