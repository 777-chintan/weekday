import { Provider } from "react-redux";
import store from "./store";
import JobList from "./components/job-list/jobList";
import "./App.css";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <JobList />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
