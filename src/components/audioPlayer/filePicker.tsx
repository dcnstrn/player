import React, { ChangeEvent, useCallback, useContext } from "react";
import PlayerContext from "./provider/context";
import { readAudio } from "./helper";

const FilePicker = () => {
  const { audioFile, setAudioFile } = useContext<any>(PlayerContext);

  const getAudio = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const [audio] = event.target.files as any;
    const arrayBuffer = await readAudio(audio);
    setAudioFile(arrayBuffer);
  }, []);

  if (audioFile) {
    return null;
  }

  return (
    <label className="label">
      <span className="line1"></span>
      <span className="line2"></span>
      <input type={"file"} accept="audio/mpeg3" onChange={getAudio} />
    </label>
  );
};

export default FilePicker;
