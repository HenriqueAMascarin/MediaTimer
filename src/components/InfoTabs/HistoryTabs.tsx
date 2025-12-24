import { useAppSelector } from "../Utils/Redux/reduxHookCustom";
import {
  View,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  historyStyle,
  widthHistoryItem,
} from "@src/components/InfoTabs/styles/historyStyles";
import PlaySvg from "@assets/images/play.svg";
import TrashSvg from "@assets/images/trash.svg";
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
} from "@src/components/InfoTabs/Alerts/AlertComponents";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMusic } from "../Utils/buttons";
import { animatedModalsOpacity } from "../Utils/animatedModalsOpacity";
import { decode } from "html-entities";
import RNFetchBlob from "rn-fetch-blob";
import TextDefault from "../Texts/TextDefault";
import { fileRegex, historyLocalKey } from "@src/components/Utils/globalVars";
import { useTextTranslation } from "@src/components/Utils/Context/TranslationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const scrollListRef = useRef<null | ScrollView>(null);

  const lastScrollValueOfScrollList = useRef(0);

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

  const changeItemSelected = useCallback((item: historyItem) => {
    if (!item.isSelected) {
      let newArr = structuredClone(stateHistory.historyItems);

      let success = false;

      changeErrorText(null);

      changeStatus({ searching: true, success: false, error: false });

      newArr.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });

      // setTimeout is to let the modal show a little before the request of fetch blob that is going do a stuck to the app
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
  }, []);

  function onClose() {
    changeStatus({ searching: false, success: false, error: false });

    dispatch(changeIsHistory(false));
  }

  let opacityModal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedModalsOpacity({ isOpen: true, animatedOpacity: opacityModal });
  }, []);

  async function removeItemFromHistory(indexItem: number) {
    let newArrayHistory = structuredClone(stateHistory.historyItems);

    newArrayHistory = newArrayHistory.filter((_, index) => index != indexItem);

    const jsonHistoryArray = JSON.stringify(newArrayHistory);

    await AsyncStorage.setItem(historyLocalKey, jsonHistoryArray);

    dispatch(changeHistoryArray(newArrayHistory));

    // Responsible for not bug the scroll when deleting a history card
    if (scrollListRef.current) {
      // 20 is for not stuck the scroll
      const newScrollXValue =
        lastScrollValueOfScrollList.current - widthHistoryItem - 20;

      scrollListRef.current?.scrollTo({ x: newScrollXValue, animated: false });
    }
  }

  function onScrollViewFinish(
    eventScroll: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    lastScrollValueOfScrollList.current =
      eventScroll.nativeEvent.contentOffset.x;
  }

  return (
    <View>
      {!status.searching ? (
        stateHistory.historyItems.length > 0 ? (
          <Animated.ScrollView
            ref={scrollListRef}
            horizontal
            style={[{ maxHeight: 90, opacity: opacityModal }]}
            onMomentumScrollEnd={onScrollViewFinish}
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

                      <TouchableOpacity
                        onPress={() => removeItemFromHistory(keyItem)}
                        style={historyStyle.removeHistoryBtn}
                      >
                        <TrashSvg width={"10px"} height={"11px"} />

                        <TextDefault style={historyStyle.textRemoveHistory}>
                          {translateText("history.removeFromHistory")}
                        </TextDefault>
                      </TouchableOpacity>
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
