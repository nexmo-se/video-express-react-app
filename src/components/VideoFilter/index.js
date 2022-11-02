import React from "react";
import * as VideoExpress from "@vonage/video-express";
import BlurOn from "@material-ui/icons/BlurOn";
import BlurCircular from "@material-ui/icons/BlurCircular";
import BlockIcon from "@material-ui/icons/Block";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

const backgroundImages = ["vonage_background", "simpson_background"];

function VideoFilter({ handleChangeVideoFilter }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const applyFilter = async (filterName, filterPayload) => {
    setLoading(true);
    switch (filterName) {
      case "backgroundImage":
        const imageEl = await loadImage(filterPayload);
        await handleChangeVideoFilter("backgroundImage", imageEl);
        break;
      default:
        await handleChangeVideoFilter(filterName, filterPayload);
    }
    setLoading(false);
  };

  const loadImage = (name) => {
    return fetch(`${process.env.PUBLIC_URL}/backgrounds/${name}.jpeg`)
      .then((res) => res.blob())
      .then((blob) => blobToBase64(blob))
      .then((base64) => {
        return base64;
      });
  };

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  if (VideoExpress.hasMediaProcessorSupport()) {
    return (
      <div className={classes.videoFilterContainer}>
        <p>Background Options</p>
        <div className={classes.flex}>
          {loading && (
            <div className={classes.backgroundLoading}>
              <CircularProgress />
            </div>
          )}
          <div className={classes.buttonContainer} onClick={() => applyFilter("reset", "")}>
            <BlockIcon
              style={{ transform: "scale(1.5)", position: "absolute", top: "calc(50% - 10px)", left: "calc(50% - 10px)", fontSize: "21px" }}
            />
          </div>
          <div className={classes.buttonContainer} onClick={() => applyFilter("blur", "low")}>
            <BlurOn style={{ transform: "scale(1.5)", position: "absolute", top: "calc(50% - 10px)", left: "calc(50% - 10px)", fontSize: "21px" }} />
          </div>
          <div className={classes.buttonContainer} onClick={() => applyFilter("blur", "high")}>
            <BlurCircular
              style={{ transform: "scale(1.5)", position: "absolute", top: "calc(50% - 10px)", left: "calc(50% - 10px)", fontSize: "21px" }}
            />
          </div>
          {backgroundImages.map((img) => (
            <img
              key={img}
              onClick={() => applyFilter("backgroundImage", img)}
              className={classes.backgroundImage}
              src={`${process.env.PUBLIC_URL}/backgrounds/${img}.jpeg`}
              alt={`Background ${img}`}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default VideoFilter;
