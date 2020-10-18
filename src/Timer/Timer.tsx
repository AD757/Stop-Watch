// libs
import React from "react";
import { connect } from "react-redux";

// src
import prettyPrintTime from "../utils";
import { ReduxStoreState } from "../types";

type StoreProps = {
  currentTime: number;
};

type Props = StoreProps;

const Timer = (props: Props) => {
  const { currentTime } = props;
  return (
    <div>
      <h1>{prettyPrintTime(currentTime)}</h1>
    </div>
  );
};

const mapStateToProps = ({
  timer: { currentTime }
}: ReduxStoreState): StoreProps => ({
  currentTime
});

export default connect<StoreProps, ReduxStoreState>(mapStateToProps)(Timer);
