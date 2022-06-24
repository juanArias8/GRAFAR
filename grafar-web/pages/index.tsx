import type { NextPage } from "next";
import FunctionForm from "../components/FunctionForm/FunctionForm";
import styles from "../styles/pages/Index.module.scss";

import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicPlot = dynamic(
  import("../components/FunctionGraph/FunctionGraph"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const [graphData, setGraphData] = useState();

  return (
      <main className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          <h1 className="title white">GRAFAR</h1>
          <p className="body white">2D and 3D Mathematical Functions Plotter</p>

          <div className={styles.optionsInfo}>
            <p className={styles.infoTitle}>
              <span className="material-icons">info</span> How it works:
            </p>

            <p className="body">
              Enter the function in terms of one (x) or two variables (x and y).
              Then enter the values [a, b] for the interval that you want the
              graph to plot and click submit.
            </p>

            <code>Example: sin(x)+y^3 [0, 10]</code>
          </div>

          <FunctionForm setResponseData={setGraphData}/>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.graphContainer}>
            <DynamicPlot data={graphData}/>
          </div>

          <footer className={styles.footer}>
            <p>
              Made with love <span className="material-icons">favorite</span>
            </p>
            <p>Medellin-Colombia {new Date().getUTCFullYear()}</p>

            <a target="_blank" href="https://github.com/juanArias8">
              github: juanArias8
            </a>
            <a target="_blank" href="https://twitter.com/juanArias8_dev">
              twitter: @juanArias8_dev
            </a>
          </footer>
        </div>
      </main>
  );
};

export default Home;
