import { selector } from "recoil";

import { getProjects } from "db/projects.queries";

export const ProjectsLoadableState = selector({
  key: "ProjectsLoadableState",
  get: async () => {
    const response = await getProjects();
    return response.data;
  },
});

// export const getCardQuery = selectorFamily({
//   key: "Card",
//   get: (cardId: string | null) => async () => {
//     if (cardId == null) {
//       return null;
//     }
//
//     const response = await getCard(cardId);
//     return response.data;
//   },
// });
