// libs
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// src
import "./Actions.css";
import { updateTimerState } from "../redux/actions/timerActions";
import { updateLog, updateSplitLog } from "../redux/actions/logActions";
import { EVENTS } from "../constants";
import { ReduxStoreState } from "../types";

type OwnProps = {
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
};

type StoreProps = {
  timerState: boolean;
  currentTime: number;
};

type DispatchProps = {
  updateTimerState: (timerState: boolean) => void;
  updateLog: (timerAction: string, currentTime: number) => void;
  updateSplitLog: (timerAction: string, currentTime: number) => void;
};

type Props = StoreProps & DispatchProps & OwnProps;

const Actions = (props: Props) => {
  const {
    timerState,
    updateTimerState,
    currentTime,
    updateLog,
    updateSplitLog,
    handleStart,
    handleStop,
    handleReset
  } = props;

  return (
    <div className="buttons">
      {timerState === false ? (
        <button
          className="start"
          onClick={() => {
            updateTimerState(true);
            handleStart();
            updateLog(EVENTS.START, currentTime);
          }}
        >
          START
        </button>
      ) : (
        <button
          className="stop"
          onClick={() => {
            updateTimerState(false);
            handleStop();
            updateLog(EVENTS.PAUSE, currentTime);
          }}
        >
          PAUSE
        </button>
      )}

      <button
        className="split"
        onClick={() => {
          updateLog(EVENTS.SPLIT, currentTime);
          updateSplitLog(EVENTS.SPLIT, currentTime);
        }}
        disabled={timerState === false}
      >
        SPLIT
      </button>

      <button
        className="reset"
        onClick={() => {
          handleReset();
        }}
        disabled={timerState === true}
      >
        RESET
      </button>
    </div>
  );
};

const mapStateToProps = ({
  timer: { timerState, currentTime }
}: ReduxStoreState): StoreProps => ({
  timerState,
  currentTime
});

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return bindActionCreators(
    {
      updateTimerState,
      updateLog,
      updateSplitLog
    },
    dispatch
  );
};

export default connect<StoreProps, DispatchProps, OwnProps, ReduxStoreState>(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
