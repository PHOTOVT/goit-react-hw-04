import { MutatingDots } from "react-loader-spinner";
import css from "./Loader.module.css";

import React from "react";

const Loader = () => {
  return (
    <div className={css.loader}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#0000ff"
        secondaryColor="#ffffff"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
