import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Alerts from "./Alerts";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      
      <CreatePost />
      <Alerts />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;