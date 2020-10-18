// libs
import React, { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// src
import "./App.css";
import Timer from "./Timer";
import Actions from "./Actions";
import LogTable from "./LogTable";
import SplitTimer from "./SplitTimer";
import { updateTimer, resetTimer } from "./redux/actions/timerActions";
import { resetLogs } from "./redux/actions/logActions";
import { ReduxStoreState } from "./types";

type StoreProps = {
  currentTime: number;
};

type DispatchProps = {
  updateTimer: (newTime: number) => void;
  resetTimer: () => void;
  resetLogs: () => void;
};

type Props = StoreProps & DispatchProps;
let timer!: ReturnType<typeof setTimeout>;

const App = (props: Props) => {
  const timerStartRef = useRef(0);

  const startTimer = () => {
    const { currentTime } = props;
    timerStartRef.current = Date.now() - currentTime;

    timer = setInterval(() => {
      const { updateTimer } = props;
      updateTimer(Date.now() - timerStartRef.current);
    }, 1);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const resetTheTimer = () => {
    const { resetTimer, resetLogs } = props;
    resetTimer();
    resetLogs();
  };

  return (
    <div className="container">
      <div className="stopWatch">
        <Timer />
        <SplitTimer />
        <Actions
          handleStart={startTimer}
          handleStop={stopTimer}
          handleReset={resetTheTimer}
        />
        <LogTable />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  timer: { currentTime }
}: ReduxStoreState): StoreProps => ({
  currentTime
});

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return bindActionCreators(
    {
      updateTimer,
      resetTimer,
      resetLogs
    },
    dispatch
  );
};

export default connect<StoreProps, DispatchProps, ReduxStoreState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
