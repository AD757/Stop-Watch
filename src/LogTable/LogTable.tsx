// libs
import React from "react";
import { connect } from "react-redux";

// src
import "./LogTable.css";
import prettyPrintTime from "../utils";
import { ReduxStoreState } from "../types";

type StoreProps = {
  logs: any;
};

type Props = StoreProps;

const LogTable = (props: Props) => {
  const { logs } = props;
  const timerColors = (action: string) => {
    switch (action) {
      case "START":
        return "#03DAC6";
      case "PAUSE":
        return "#FF7597";
      case "SPLIT":
        return "#F9AB25";
      default:
        return "#FFF";
    }
  };
  return logs.map((item: { action: string; time: number }, i: number) => (
    <div className="formatting" key={i}>
      <td>#{i}</td>
      <td style={{ color: timerColors(item.action) }}>
        {prettyPrintTime(item.time)}
      </td>
      <td>{item.action}</td>
    </div>
  ));
};

const mapStateToProps = ({ log: { logs } }: ReduxStoreState): StoreProps => ({
  logs
});

export default connect<StoreProps, ReduxStoreState>(mapStateToProps)(LogTable);
