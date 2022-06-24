import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./FunctionGraph.module.scss";

const FunctionGraph = (props: { data: any }) => {
  const { width, height } = useWindowDimensions();
  const [plotData, setPlotData] = useState<any>([]);
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    if (!props.data) return;
    setPlotData([
      {
        ...props.data.mesh,
        type: props.data.function.includes("y") && "surface",
      },
    ]);

    const isPhone = width && width < 767;
    const finalWidth = width && (isPhone ? width : width * 0.75);
    const finalHeight = height && (isPhone ? width : height - 80);
    setLayout({
      width: finalWidth,
      height: finalHeight,
      title: props.data.function,
    });
  }, [props.data, width, height]);

  return (
    <div className={styles.graphContainer}>
      {plotData && layout ? (
        <Plot data={plotData} layout={layout} />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default FunctionGraph;
