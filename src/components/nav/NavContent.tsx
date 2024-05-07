import clsx from "clsx";
import { About } from "../about/About";
import { Login } from "../login/Login";
import { TabName } from "@/types";

export const NavContent = ({
  currentTab,
}: {
  currentTab: TabName;
}): JSX.Element => {
  return (
    <div className={clsx("flex justify-center items-center")}>
      {currentTab === "about" && <About />}
      {currentTab === "login" && <Login />}
      {currentTab === "pricing" && <div>{currentTab}</div>}
    </div>
  );
};
