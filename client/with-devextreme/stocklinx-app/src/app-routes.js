import {
  HomePage,
  TasksPage,
  ProfilePage,
  AccessoryPage,
  AssetPage,
  ComponentPage,
  ConsumablePage,
  LicensePage,
  ModelPage,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/home",
    element: HomePage,
  },

  {
    path: "/accessory",
    element: AccessoryPage,
  },
  {
    path: "/asset",
    element: AssetPage,
  },
  {
    path: "/component",
    element: ComponentPage,
  },
  {
    path: "/consumable",
    element: ConsumablePage,
  },
  {
    path: "/license",
    element: LicensePage,
  },
  {
    path: "/model",
    element: ModelPage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
