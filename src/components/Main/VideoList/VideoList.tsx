import { FC, memo } from "react";
import styles from "./VideoList.module.css";

const VideoList: FC<any> = () => {
  return (
    <>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DIJn6m_gKsU?si=DRa_SoHc9oSVumI5"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen>
        </iframe>
      </div>
    </>
  );
};

export default memo(VideoList);
