import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Auth, API } from "aws-amplify";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listProjects } from "./graphql/queries";
import {
  createProject as createNoteMutation,
  deleteProject as deleteNoteMutation,
} from "./graphql/mutations";
import AddProject from "./components/projects/AddProject";
import ProjectsHeader from "./components/projects/ProjectsHeader";
import Divider from "./components/Divider";
import RoundedButton from "./components/RoundedButton";

const App = ({ signOut }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listProjects });
    const projectsFromAPI = apiData.data.listProjects.items;
    setProjects(projectsFromAPI);
  }

  async function createNote(event) {
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
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = projects.filter((note) => note.id !== id);
    setProjects(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      {/* <Heading level={1}>My Notes App</Heading> */}
      <div className="App-Window fill">
        <ProjectsHeader n_projects={projects.length} />
        {/* <AddProject onSubmit={createNote} /> */}
        {/* <Heading level={2}>Current Notes</Heading> */}
        <Divider />
        <div className="w-full box-border px-8">
            {projects.map((note) => (
                <RoundedButton key={note.id} text={note.name} />
            // <Flex
            //     key={note.id || note.name}
            //     direction="row"
            //     justifyContent="center"
            //     alignItems="center"
            // >
            //     <Text as="strong" fontWeight={700}>
            //     {note.name}
            //     </Text>
            //     <Text as="span">{note.description}</Text>
            //     <Button variation="link" onClick={() => deleteNote(note)}>
            //     Delete note
            //     </Button>
            // </Flex>
            ))}
        </div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default withAuthenticator(App);