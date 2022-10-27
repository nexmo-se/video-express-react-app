import { useCallback, useState } from "react";
import { startRecording, stopRecording } from "../../api/fetchRecording";

import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import { IconButton } from "@material-ui/core";
import styles from "./styles";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import VideoFilter from "../VideoFilter";

export default function VideoFilterButton({ classes, room }) {
  const [open, setOpen] = useState(false);
  const localClasses = styles();
  const [modalStyle] = useState(getModalStyle);
  const [videoFilter, setVideoFilter] = useState({ filterName: "", filterPayload: "" });

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeVideoFilter = useCallback(
    async (filter, filterPayload) => {
      const camera = room.camera;
      if (camera && filter) {
        switch (filter) {
          case "reset":
            await camera.clearVideoFilter();
            setVideoFilter({ filterName: "", filterPayload: "" });
            break;
          case "blur":
            await camera.setVideoFilter({ type: "backgroundBlur", blurStrength: filterPayload });
            setVideoFilter({ filterName: filter, filterPayload });
            break;
          case "backgroundImage":
            await camera.setVideoFilter({ type: "backgroundReplacement", backgroundImgUrl: filterPayload });
            setVideoFilter({ filterName: filter, filterPayload });
            break;
          default:
          // do nothing
        }
      }
    },
    [room]
  );

  // const title = isRecording ? "Stop Recording" : "Start Recording";
  const body = (
    <div style={modalStyle} className={localClasses.paper}>
      <VideoFilter handleChangeVideoFilter={handleChangeVideoFilter} />
    </div>
  );
  return (
    <>
      <Tooltip title={"Apply Video Filter"} aria-label="add">
        <IconButton edge="start" color="inherit" aria-label="mic" onClick={handleOpen} className={classes.toolbarButtons}>
          <CameraEnhanceIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </>
  );
}
