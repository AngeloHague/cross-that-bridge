import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Auth, API } from "aws-amplify";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listProjects } from "./graphql/queries";
import {
  createProject as createProjectMutation,
  deleteProject as deleteProjectMutation,
} from "./graphql/mutations";
import ProjectsHeader from "./components/projects/ProjectsHeader";
import Divider from "./components/Divider";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ProjectsList from "./components/projects/Projects";
import { OverlayProvider, useOverlay } from "./components/OverlayContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsFromAWS } from "./util/aws-amplify";

const App = ({ signOut }) => {
    const projects = useSelector(state => state.projects.projects);
    console.log(projects)
    const dispatch = useDispatch();
    useEffect(() => {
        fetchProjectsFromAWS(dispatch);
    }, [dispatch]);
  return (
    <div className="App text-white">
      <div className="App-Window fill flex flex-col">
        <ProjectsHeader />
        <Divider />
        <main className="flex-grow">
            <ProjectsList />
        </main>
        <button className="soft-dark rounded-xl flex gap-4 m-auto px-4 py-3 mb-8" onClick={signOut}>
            <p className="uppercase text-xl font-semibold">Sign Out</p>
            <FeatherIcon icon={"log-out"} />
        </button>
      </div>
    </div>
  );
};

export function AppWithOverlay() {
    return (
        <OverlayProvider>
            <App />
        </OverlayProvider>
    )
}

export default withAuthenticator(AppWithOverlay);