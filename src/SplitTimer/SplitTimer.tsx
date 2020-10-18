// libs
import React from "react";
import { connect } from "react-redux";

// src
import prettyPrintTime from "../utils";
import "./SplitTimer.css";
import { ReduxStoreState } from "../types";

type StoreProps = { splitLogs: any };

type Props = StoreProps;

const SplitTimer = (props: Props) => {
  const { splitLogs } = props;
  return splitLogs.map((item: { time: number }) => (
    <div className="splitFormatter">
      <td>{prettyPrintTime(item.time)}</td>
    </div>
  ));
};

const mapStateToProps = ({
  log: { splitLogs }
}: ReduxStoreState): StoreProps => ({
  splitLogs
});

export default connect<StoreProps, ReduxStoreState>(mapStateToProps)(
  SplitTimer
);
