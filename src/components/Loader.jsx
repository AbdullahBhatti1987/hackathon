import React from "react";
import Loader from "react-js-loader";

function CustomLoader() {
  return <Loader type="hourglass" bgColor={"#1975d1"} color={"#1975d1"} title={"Loading..."} size={100} />;
}

export default CustomLoader;
