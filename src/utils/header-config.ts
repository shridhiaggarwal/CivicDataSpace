import toast from "react-hot-toast";
import { HEADER } from "./types";

const handleUnavailableFeature = () => {
  toast("Feature not available");
};

// const handleNavigation = (route: string) => {
//   window.location.href = route;
// };

// Header navigation configuration
export const headerConfig = [
  {
    id: HEADER.ALL_DATA,
    name: "ALL DATA",
    onClick: () => {},
  },
  {
    id: HEADER.SECTORS,
    name: "SECTORS",
    onClick: () => handleUnavailableFeature(),
  },
  {
    id: HEADER.USE_CASES,
    name: "USE CASES",
    onClick: () => handleUnavailableFeature(),
  },
  {
    id: HEADER.PUBLISHERS,
    name: "PUBLISHERS",
    onClick: () => handleUnavailableFeature(),
  },
  {
    id: HEADER.ABOUT_US,
    name: "ABOUT US",
    onClick: () => handleUnavailableFeature(),
  },
];
