import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import DropDownMobile from "./DropDownMobile";
import ModalBox from "@/components/cartModal/ModalBox";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SearchFilter from "@/components/searchFilter/SearchFilter";
import CategoryDropdown from "./CategoryDropdown";

interface NavItemWithPath {
  name: string;
  path: string;
}

export type NavItem = NavItemWithPath;

const NavBar = () => {
  const navUrl: NavItem[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Category",
      path: "",
    },
  ];

  const user = true;
  return (
    <div className="flex-blue 500 items-center gap-8 w-full relative">
      <div className="text-white w-32">
        {/* <Link to={"/"}>
          <img src={logo} alt="" className="w-full h-full" />
        </Link> */}
      </div>
      <div className="sm:hidden ms-auto">
        <DropDownMobile navUrl={navUrl} user={user}></DropDownMobile>
      </div>
      <ModalBox></ModalBox>
      <div className="w-full hidden sm:inline">
        <div className="ml-3 flex items-center justify-between w-full">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {navUrl.map((item) => {
                if (item.name === "Category") {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <CategoryDropdown />
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      className="font-semibold text-white hover:text-green-600"
                      to={item.path as string}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center justify-center mr-4">
            <SearchFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

export const AuthLink = ({ classText }: { classText: string }) => {
  return (
    <>
      <Link
        className={`${classText} font-semibold hover:text-green-600`}
        to={""}
      >
        <DropdownMenuItem className={classText}>{"Profile"}</DropdownMenuItem>
      </Link>
      <Link
        className={`${classText} font-semibold hover:text-green-600`}
        to={""}
      >
        <DropdownMenuItem className={classText}>{"Logout"}</DropdownMenuItem>
      </Link>
    </>
  );
};

export const LoginButton = () => {
  return <Button className="bg-green-600">Login</Button>;
};
