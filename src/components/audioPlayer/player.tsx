import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PlayerContext from "./provider/context";
import AudioDriver from "./driver";
import playerEvents from "./events";

const Player = () => {
  const { buffer, audioContext } = useContext<any>(PlayerContext);
  const [driver, setDriver] = useState<AudioDriver>();
  const [timeline, setTimeline] = useState(0);

  useEffect(() => {
    if (!buffer) {
      return;
    }

    const init = async () => {
      const audioDriver = new AudioDriver(buffer, audioContext);
      setDriver(audioDriver);
    };

    init();
  }, [buffer, audioContext]);

  useEffect(() => {
    const onDrag = (props: any) => {
      console.log(props.percent, "lalalalla");
      driver?.playUp(Number((props.percent / 100) * buffer.duration));
    };

    playerEvents.on("dragCursor", onDrag);

    return () => {
      playerEvents.off("dragCursor", onDrag);
    };
  }, [driver, buffer]);

  const play = useCallback(() => {
    driver?.play();
  }, [driver]);

  const pause = useCallback(() => {
    driver?.pause();
  }, [driver]);

  const stop = useCallback(() => {
    driver?.pause(true);
  }, [driver]);

  const onVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      driver?.changeVolume(Number(event.target.value));
    },
    [driver]
  );

  const onTimeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      driver?.playUp(Number(event.target.value));
    },
    [driver]
  );

  // const onScrollChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     driver?.
  //   },
  //   [driver]
  // );

  if (!buffer) {
    return null;
  }

  if (!driver) {
    return <div>Loading</div>;
  }

  return (
    <div className="player">
      <div className="playerWrapper">
        <div className={"playerButtons"}>
          <button className="playerBtn" onClick={play}>
            Play
          </button>

          <button className="playerBtn" onClick={pause}>
            Pause
          </button>

          <button className="playerBtn" onClick={stop}>
            Stop
          </button>
        </div>
        <div className="playerInputs">
          <div className="inputWrapper">
            <span>volume</span>
            <input
              type="range"
              onChange={onVolumeChange}
              defaultValue={1}
              min={-1}
              max={1}
              step={0.01}
            />
          </div>

          <div className="inputWrapper">
            <span>timeline</span>
            <input
              type="range"
              onChange={onTimeChange}
              defaultValue={0}
              min={0}
              max={buffer.duration}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
