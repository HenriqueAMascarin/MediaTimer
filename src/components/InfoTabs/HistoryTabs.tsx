import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import {
  View,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
} from "react-native";
import { historyStyle } from "./styles/historyStyles";
import PlaySvg from "@assets/images/play.svg";
import { colorsStyle } from "../Utils/colorsStyle";
import {
  changeHistoryArray,
  changeIsHistory,
  historyItem,
} from "../Utils/Redux/features/stateHistory-slice";
import {
  SuccessAlert,
  LoadingAlert,
  ErrorAlert,
} from "@src/components/InfoTabs/Alerts/Components";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMusic } from "../Utils/buttons";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import { decode } from "html-entities";
import RNFetchBlob from "rn-fetch-blob";
import TextDefault from "../Texts/TextDefault";
import { fileRegex } from "../Utils/globalVars";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";

export default function HistoryTabs() {
  const { translateText } = useTextTranslation();

  const stateMusic = useAppSelector(({ stateMusic }) => stateMusic);

  const stateHistory = useAppSelector(({ stateHistory }) => stateHistory);

  const [status, changeStatus] = useState({
    searching: false,
    success: false,
    error: false,
  });

  const [errorText, changeErrorText] = useState<null | string>(null);

  const dispatch = useDispatch();

  function musicName(nameMusic: string) {
    const maxLength = 16;

    const nameWithoutFile = nameMusic.replace(fileRegex, "");

    const nameMusicDecode = decode(nameWithoutFile);

    const nameOnly =
      nameMusicDecode
        .slice(
          nameMusicDecode.indexOf("- ") != -1
            ? nameMusicDecode.indexOf("- ") + 2
            : 0
        )
        .slice(0, maxLength) + " ";

    const nameFormated =
      nameOnly.lastIndexOf(" ") < maxLength - 2
        ? nameOnly.slice(0, nameOnly.lastIndexOf(" "))
        : nameOnly.slice(0, nameOnly.lastIndexOf("  ")) + "...";

    return nameFormated;
  }

  function authorName(item: historyItem) {
    const maxLength = 19;

    const nameMusicDecode = decode(item.nameMusic);

    const authorName = (
      nameMusicDecode.indexOf(" -") != -1 &&
      nameMusicDecode.slice(0, nameMusicDecode.indexOf(" -")).length < maxLength
        ? nameMusicDecode.slice(0, nameMusicDecode.indexOf(" -"))
        : decode(item.authorMusic)
    ).slice(0, maxLength);

    const authorNameFormated =
      authorName.length < maxLength
        ? authorName
        : authorName.slice(0, authorName.lastIndexOf("  ")) + "...";

    return authorNameFormated;
  }

  function dontHavePermission() {
    changeErrorText(translateText("statusMessages.dontHavePermissions"));
  }

  async function changeItemSelected(item: historyItem) {
    if (!item.isSelected) {
      changeErrorText(null);

      changeStatus({ searching: true, success: false, error: false });

      let newArr = [...stateHistory.historyItems];

      for (let key = 0; key < newArr.length; key++) {
        newArr[key].isSelected = false;
      }

      let success = false;

      setTimeout(async () => {
        if (item.uri) {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ])
            .then(async (status) => {
              if (
                status["android.permission.READ_EXTERNAL_STORAGE"] ==
                  "granted" &&
                status["android.permission.WRITE_EXTERNAL_STORAGE"] == "granted"
              ) {
                if (item.uri) {
                  await RNFetchBlob.fs
                    .stat(item.uri)
                    .then((data) => {
                      changeMusic(
                        stateMusic.pressBtn,
                        { audioFile: true },
                        data.path,
                        false
                      );

                      success = true;
                    })
                    .catch(() => (success = false));
                }
              } else {
                dontHavePermission();
              }
            })
            .catch(() => dontHavePermission());
        }

        if (success) {
          const indexSelected = newArr.findIndex((el) => el.uri == item.uri);

          newArr[indexSelected] = {
            ...newArr[indexSelected],
            isSelected: true,
          };

          dispatch(changeHistoryArray(newArr));

          changeStatus({ searching: true, success: true, error: false });
        } else {
          changeMusic(stateMusic.pressBtn, { reset: true });

          dispatch(changeHistoryArray(newArr));

          changeStatus({ searching: true, success: false, error: true });
        }
      }, 400);
    }
  }

  function onClose() {
    changeStatus({ searching: false, success: false, error: false });
    dispatch(changeIsHistory(false));
  }

  let opacityModal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });
  }, []);

  return (
    <View>
      {!status.searching ? (
        stateHistory.historyItems.length > 0 ? (
          <Animated.ScrollView
            horizontal
            style={[{ maxHeight: 90, opacity: opacityModal }]}
          >
            <View style={[historyStyle.container]}>
              {stateHistory.historyItems.map((item, keyItem) => {
                return (
                  <View
                    style={[historyStyle.item]}
                    key={keyItem}
                    aria-label={`${translateText("card")} ${
                      keyItem + 1
                    }, ${translateText("history.aboutSaved")}`}
                  >
                    <View style={{ width: 150 }}>
                      <TextDefault>{musicName(item.nameMusic)}</TextDefault>
                      <TextDefault>{authorName(item)}</TextDefault>
                    </View>
                    <TouchableOpacity
                      onPress={() => changeItemSelected(item)}
                      aria-label={translateText("history.btnSelectAudio")}
                    >
                      <PlaySvg
                        width={"35px"}
                        height={"35px"}
                        fill={
                          item.isSelected
                            ? colorsStyle.principal.blue
                            : colorsStyle.principal.black
                        }
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </Animated.ScrollView>
        ) : (
          <ErrorAlert
            closeFunction={onClose}
            alertText={translateText("history.dontHaveArchive")}
          />
        )
      ) : !status.success && !status.error ? (
        <LoadingAlert />
      ) : status.success && !status.error ? (
        <SuccessAlert closeFunction={onClose} />
      ) : (
        <ErrorAlert closeFunction={onClose} alertText={errorText} />
      )}
    </View>
  );
}
