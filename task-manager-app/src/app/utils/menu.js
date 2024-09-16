import { home, list, check, todo } from "./icons";
const menu = [
  {
    id: 1,
    title: "All tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Upcoming",
    icon: todo,
    link: "/upcoming",
  },
];

export default menu;
