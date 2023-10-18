import { FC, useEffect, useState } from "react";
import styles from "./ImageList.module.scss";
import Button from "src/components/UI/Button";

import ImageUpload from "src/components/ImageUpload";
import { ImageListType } from "react-images-uploading";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import UserImageAction from "src/store/actions/user/ImageAction";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import CircularIndeterminate from "src/components/CircularIndeterminate";

const ImageList: FC<any> = () => {
  const imageSelector = useAppSelector((s) => s.userImageReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserImageAction.imagesGetAll());
  }, []);

  const [image, setImage] = useState<
    Array<{ data_url: string; file?: File }>
  >([]);

  useEffect(() => {
    setImage(imageSelector.items.map((item) => {
      return {
        data_url: item.filepath
      };
    }))
  }, [imageSelector.items]);

  // @ts-ignore
  const onChangeImage = async (imageList, addUpdateIndex) => {
    if (imageList.length > image.length) {
      // Определяем элементы, которые будут добавлены
      dispatch(UserImageAction.imagesAdd(imageList.filter((item: { file: File; }) => item.file), () => {
        dispatch(messageQueueAction.addMessage(null, "success", "Изображение успешно добавлено!"));
        dispatch(UserImageAction.imagesGetAll());
      }));

    } else if (imageList.length < image.length) {
      // Определяем элемент, который будет удалён
      const findItem = image.filter((item) => {
        const index = imageList.find((subItem: { data_url: string; }) => subItem.data_url === item.data_url);
        return !index;
      });

      const item = findItem.length > 0 && findItem[0] || null;
      if (item) {
        const element = imageSelector.items.find((value) => value.filepath === item.data_url);

        element && dispatch(UserImageAction.imagesDelete(element.id, () => {
          dispatch(messageQueueAction.addMessage(null, "dark", "Изображение удалено!"));
        }));
      }
    } else {
      // Определяем элемент, который будет изменён
      const indexItem = addUpdateIndex.length > 0 && addUpdateIndex[0];

      if (typeof (indexItem) === "number" && indexItem >= 0) {
        const elementImage = image.find((value, index) => !value.file && index === indexItem);
        const element = imageSelector.items.find((value) => value.filepath === elementImage?.data_url);

        element && dispatch(UserImageAction.imagesEdit(element.id, imageList[indexItem], () => {
          dispatch(messageQueueAction.addMessage(null, "success", "Изображение успешно обновлено!"));
        }));
      }
    }
  };

  return (
    <>
      {imageSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <ImageUpload
          title={""}
          subtitle={"Добавить изображение"}
          value={image}
          onChange={onChangeImage}
          multiple={true}
        />
      </div>
    </>
  );
};

export default ImageList;
