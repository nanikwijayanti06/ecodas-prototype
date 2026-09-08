import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Awareness from "./pages/Awareness";
import Tracker from "./pages/Tracker";
import Behavior from "./pages/Behavior";
import CollectiveIntelligence from "./pages/CollectiveIntelligence";
import DecisionSupport from "./pages/DecisionSupport";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>

        {/* SIDEBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main style={styles.mainContent}>
          <Routes>

            {/* HOME / DASHBOARD */}
            <Route path="/" element={<Home />} />

            {/* LAYER 1 - AWARENESS */}
            <Route path="/awareness" element={<Awareness />} />

            {/* LAYER 2 - FEEDBACK MECHANISM / TRACKER */}
            <Route path="/tracker" element={<Tracker />} />

            {/* LAYER 3 - BEHAVIOR CHANGE */}
            <Route path="/behavior" element={<Behavior />} />

            {/* LAYER 4 - COLLECTIVE INTELLIGENCE */}
            <Route
              path="/collective-intelligence"
              element={<CollectiveIntelligence />}
            />

            {/* LAYER 5 - DECISION SUPPORT */}
            <Route
              path="/decision-support"
              element={<DecisionSupport />}
            />

            {/* DASHBOARD LAMA */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* PROFILE */}
            <Route path="/profile" element={<Profile />} />

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

          </Routes>
        </main>

      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    position: "relative",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },

  mainContent: {
    marginLeft: "260px",
    minHeight: "100vh",
    width: "calc(100% - 260px)",
    padding: "0",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
};

export default App;