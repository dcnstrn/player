import React, { useContext, useEffect, useState } from "react";
import PlayerContext from "./provider/context";
import Chart from "./chart";

const Graphic = () => {
  const { buffer } = useContext<any>(PlayerContext);
  const [drawer, setDrawer] = useState<Chart>();

  useEffect(() => {
    if (!buffer) {
      return;
    }

    const init = async () => {
      const chartDrawer = new Chart(
        {
          buffer,
          container: document.getElementById("chart") as HTMLElement,
        },
        {
          margin: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0,
          },
        }
      );

      chartDrawer.drawGrid();

      chartDrawer.drawWaveform();
      chartDrawer.drawBands();

      chartDrawer.drawCursor();
      chartDrawer.showSVG();

      // setTimeout(() => {
      //   chartDrawer.moveCursor(30);
      //
      //   setTimeout(() => {
      //     chartDrawer.moveCursor(20);
      //   }, 1500);
      // }, 2000);

      setDrawer(chartDrawer);
    };

    init();
  }, [buffer]);

  if (!buffer) {
    return null;
  }

  return (
    <div
      id={"chart"}
      style={{ width: "100%", height: 220, background: "white" }}
    />
  );
};

export default Graphic;
