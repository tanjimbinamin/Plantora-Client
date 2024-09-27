import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface NavItemWithChild {
  name: string;
  child: {
    name: string;
    path: string;
  }[];
}

interface DropDownProps {
  item: NavItemWithChild;
}
const DropDown = ({ item }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center items-center gap-0.5">
          <p className="font-semibold  hover:text-green-600">{item.name}</p>{" "}
          <span></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-5  hidden sm:grid">
        <DropdownMenuGroup className=" hidden sm:grid">
          {item.child.map((item) => {
            return (
              <Link
                key={item.name}
                to={item.path}
                className=" hidden sm:grid font-semibold  hover:text-green-600  "
              >
                <DropdownMenuItem className=" hidden sm:grid">
                  {item.name}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
