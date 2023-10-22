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

const App = ({ signOut }) => {
  const [projects, setProjects] = useState([]);
  const [theProject, setProject] = useState();

  // Overlay functions
  const { openOverlay } = useOverlay();
  const handleOpenOverlay = (content) => {
    openOverlay(content);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listProjects });
    const projectsFromAPI = apiData.data.listProjects.items;
    setProjects(projectsFromAPI);
  }

  async function createProject(event) {
    event.preventDefault();
    // Get the currently authenticated user
    const user = await Auth.currentAuthenticatedUser();
    // Form data
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      userId: user.attributes.sub, // sub is the Cognito user ID
    };
    await API.graphql({
      query: createProjectMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = projects.filter((note) => note.id !== id);
    setProjects(newNotes);
    await API.graphql({
      query: deleteProjectMutation,
      variables: { input: { id } },
    });
  }

  function selectProject(project) {
    setProject(project.id);
    console.log(project.name);
    console.log(project.description);
  }

  return (
    <div className="App text-white">
      <div className="App-Window fill flex flex-col">
        <ProjectsHeader n_projects={projects.length} />
        <Divider />
        <main className="flex-grow">
            <ProjectsList projects={projects} setProject={selectProject} />
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