import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthLink, LoginButton, NavItem } from "./NavBar";
import { Link } from "react-router-dom";

const DropDownMobile = ({
  navUrl,
  user,
}: {
  navUrl: NavItem[];
  user: boolean;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="outline-none" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:hidden">
        {navUrl.map((item) => {
          // if ("path" in item) {
            return (
              <Link
                className="font-semibold  hover:text-green-600"
                key={item.name}
                to={item.path}
              >
                {" "}
                <DropdownMenuItem>
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </Link>
            );
          // } else {
          //   return (
          //     <DropdownMenuSub key={item.name}>
          //       <DropdownMenuSubTrigger aria-modal>
          //         <span>{item.name}</span>
          //       </DropdownMenuSubTrigger>
          //       <DropdownMenuPortal>
          //         <DropdownMenuSubContent className="ms-auto  sm:hidden top-5 absolute right-1 ">
          //           {item.child.map((item) => {
          //             return (
          //               <Link key={item.name} to={item.path}>
          //                 {" "}
          //                 <DropdownMenuItem>
          //                   <span className="text-nowrap">{item.name}</span>
          //                 </DropdownMenuItem>
          //               </Link>
          //             );
          //           })}
          //         </DropdownMenuSubContent>
          //       </DropdownMenuPortal>
          //     </DropdownMenuSub>
          //   );
          // }
        })}
        {user == false ? (
          <DropdownMenuItem>
            <LoginButton></LoginButton>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="w-10 text-white h-10 flex justify-center items-center rounded-full bg-blue-600">
                User
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="sm:hidden absolute right-14 top-12">
                <AuthLink classText="sm:hidden "></AuthLink>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMobile;
