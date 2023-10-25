import React, { useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import ProjectsHeader from "./components/projects/ProjectsHeader";
import Divider from "./components/Divider";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ProjectsList } from "./components/projects/Projects";
import { OverlayProvider } from "./components/OverlayContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsFromAWS } from "./util/aws-amplify";
import { ProjectView } from "./components/projects/ProjectView";
import { TaskView } from "./components/projects/TaskView";
import { motion, useAnimation } from "framer-motion";

function SignOutButton({ signOut }) {
  const controls = useAnimation();
  const project = useSelector(state => state.projects.current);
  const variants = {
    noProject: {
      scale: 1,
      display: 'flex',
    },
    hasProject: {
      scale: 0,
      display: 'flex',
    },
    hide: {
      display: 'none',
    }
  }
  useEffect(() => {
    // Whenever reduxVariable changes, update the animation
    if (project === null) {
      // Set the element to be off-screen
      controls.start('noProject');
    } else {
      // Set the element to be on-screen
      controls.start('hasProject');
    }
  }, [project, controls]);
  const onAnimationComplete = () => {
    if (project !== null) {
      // Change the display property to 'none' after the scale animation is complete
      controls.set('hide');
    }
  }

  return (
    <motion.button
      className="soft-dark rounded-xl flex gap-4 m-auto px-4 py-3 mt-4 mb-8"
      onClick={signOut}
      initial={'noProject'}
      animate={controls}
      variants={variants}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      onAnimationComplete={onAnimationComplete}
    >
      <p className="uppercase text-xl font-semibold">Sign Out</p>
      <FeatherIcon icon={"log-out"} />
    </motion.button>
  )
}


const App = ({ signOut }) => {
  const dispatch = useDispatch();
  // get projects on App launch
  fetchProjectsFromAWS(dispatch);
  return (
    <div className="App text-white">
      <div className="App-Window fill flex flex-col">
        <ProjectsHeader />
        <Divider />
        <main className="flex-grow relative overflow-hidden">
          <ProjectsList />
          <ProjectView />
          <TaskView />
        </main>
        <SignOutButton signOut={signOut} />
      </div>
    </div>
  );
};

export function AppWithOverlay({signOut}) {
  return (
    <OverlayProvider>
      <App signOut={signOut} />
    </OverlayProvider>
  )
}

export default withAuthenticator(AppWithOverlay);