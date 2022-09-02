import React from "react";
import { RecoilRoot } from "recoil";

import { NotifyContainer } from "ui/notify/NotifyContainer";
import { ProjectsList } from "components/projects/ProjectsList";

function Layout() {
  return (
    <div>
      <h1>Cloud Database Console</h1>
      <ProjectsList />
      <NotifyContainer />
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
}

export default App;
