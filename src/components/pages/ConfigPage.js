import React from "react";
import NavBar from "../navigation/NavBar";
import { ConfigGrid } from "../objects/ConfigGrid";
import Add from "../buttons/Add";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfigPage() {
  return (
    <>
      <NavBar />
      <ConfigGrid transition={Transition} />
      <Add transition={Transition} />
    </>
  );
}
