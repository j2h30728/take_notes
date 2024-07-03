import { Link } from "react-router-dom";

const NAVIGATORS = [
  {
    NAME: "Home",
    PATH: "/",
  },
  {
    NAME: "About",
    PATH: "/about",
  },
];

const Layout = () => {
  return (
    <ul>
      {NAVIGATORS.map((navigator) => (
        <li key={navigator.PATH}>
          <Link to={navigator.PATH}>{navigator.NAME}</Link>
        </li>
      ))}
    </ul>
  );
};
export default Layout;
