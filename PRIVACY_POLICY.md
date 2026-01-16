## Media Timer: Privacy policy

Welcome to Media Timer, an app for android!

This is a timer app developed by the company Henrique Mascarin.

### Data collected by the app

No data is collected. Everything provided like file data, audio history, and theme settings are all kept inside the app.

The list of permissions listed below are found here on the [AndroidManifest.xml](https://github.com/HenriqueAMascarin/MediaTimer/blob/main/android/app/src/main/AndroidManifest.xml).

<br/>

| Permission | Why is it necessary |
| :---: | --- |
| `android.permission.READ_EXTERNAL_STORAGE` `android.permission.WRITE_EXTERNAL_STORAGE` `android.permission.READ_MEDIA_AUDIO`| Used to read audios that the person selects from their device or that are saved in the history. |
| `android.permission.SYSTEM_ALERT_WINDOW` | Used to show application notifications when the timer is running. |
| `android.permission.DOWNLOAD_WITHOUT_NOTIFICATION` | Used to find the location of the file selected in the tab of history. |
| `android.permission.MODIFY_AUDIO_SETTINGS` | Used with EXPO AUDIO technology, to configure the audios used in the app. |
| `android.permission.FOREGROUND_SERVICE` `android.permission.WAKE_LOCK` | Used to run the app’s timer in the background. |
| `android.permission.INTERNET` `android.permission.VIBRATE` `android.permission.RECORD_AUDIO` | They will be removed in the next update. |

If you see some permissions that are not listed here or have any security questions, feel free to send a message to the email: henriqueamascarin@gmail.com