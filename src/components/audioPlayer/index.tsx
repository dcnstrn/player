import React from "react";
import PlayerProvider from "./provider";
import FilePicker from "./filePicker";
import Player from "./player";
import Graphic from "./graphic";

const AudioPlayer = () => {
  return (
    <PlayerProvider>
      <div className="wrapper">
        <h1 className="playerTitle">cheburplayer</h1>
        <FilePicker />
        <Graphic />
        <Player />
      </div>
    </PlayerProvider>
  );
};

export default AudioPlayer;
