import React, { useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";

import { ProjectsLoadableState } from "db/projects.recoil";
import { useNotify } from "ui/notify/notify.recoil";
import { createProject, removeProject } from "db/projects.queries";
import { Project } from "db/projects.types";

export function ProjectsList() {
  const loadable = useRecoilValueLoadable(ProjectsLoadableState);
  const refetch = useRecoilRefresher_UNSTABLE(ProjectsLoadableState);
  const notify = useNotify();

  useEffect(() => {
    const listener = () => refetch();

    window.addEventListener("focus", listener);
    return () => window.removeEventListener("focus", listener);
  }, []);

  const handleCreate = async () => {
    const name = window.prompt("Project name: ");

    if (!name) {
      return;
    }

    const loader = notify.loading(`staring container ${name}`);

    try {
      await createProject({ name });
      notify.success(`container started ${name}`);
    } catch (error) {
      notify.error(`container not started ${name}`);
    } finally {
      refetch();
      notify.remove(loader);
    }
  };

  const handleRemove = async (project: Project) => {
    const { id, name } = project;

    const confirmed = window.confirm(`Remove ${name} project?`);

    if (!confirmed) {
      return;
    }

    const loader = notify.loading(`removing container ${name}`);

    try {
      await removeProject({ id });
      notify.success(`container removed ${name}`);
    } catch (error) {
      notify.error(`container not removed ${name}`);
    } finally {
      refetch();
      notify.remove(loader);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Projects</h2>
        <div>
          <button onClick={() => handleCreate()}>Create Project</button>
        </div>
      </div>

      {(function () {
        if (loadable.state === "loading") {
          return <div>loading containers...</div>;
        }

        if (loadable.state === "hasError") {
          return <div>loading containers error</div>;
        }

        const projects = loadable.contents;

        if (!projects.length) {
          return <div>
            <i>You don't have any projects yet.</i>
          </div>
        }

        return (
          <ul>
            {projects?.map((project) => {
              const port = 60000 + project.id;
              const url = `http://localhost:${port}`;

              return (
                <li key={project.id}>
                  <h3>
                    {project.name} ({project.id})
                  </h3>
                  <blockquote>
                    <i>
                      link:{" "}
                      <a target="_blank" href={url}>
                        {url}
                      </a>
                    </i>
                    <br />
                    <i>image: </i> {project.Image}
                    <br />
                    <i>state: </i> {project.State}
                    <br />
                    <i>status: </i> {project.Status}
                    <br />
                    <i>actions: </i>{" "}
                    <button onClick={() => handleRemove(project)}>
                      Remove
                    </button>
                    <br />
                    <br />
                  </blockquote>
                </li>
              );
            })}
          </ul>
        );
      })()}
    </div>
  );
}
