import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddEditProduct from "../addProductModal/AddEditProduct";
import { Button } from "../ui/button";
import { toast } from "sonner";



const directory = window.location.pathname;

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [place, setPlace] = useState("");
//   const directory = window.location.pathname;

  useEffect(() => {
    if (place === directory) {
      toast.warning("You are already in the management page");
      setPlace("");
    }
  }, [place]);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <div className="relative ">
      {/* Burger Icon */}
      <div
        className="fixed mt-12  top-10  left-4 z-50 cursor-pointer"
        onClick={toggleDrawer}
      >

        {
        isDrawerOpen ? 
           (
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="50" 
            height="50" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            stroke-width="2.25"
             stroke-linecap="round" 
             stroke-linejoin="round" 
             className="lucide lucide-square-arrow-left">
                <rect width="18" height="18" x="3" y="3" rx="2"/><path d="m12 8-4 4 4 4"/><path d="M16 12H8"/></svg>
            )
            :
            (
                <svg 
                    
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" 
                    height="50" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#105946"
                    stroke-width="1.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-square-menu">
                        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/>
                </svg>
            )
        }
      
      </div>

      {/* Drawer Sidebar */}
      <div
  className={`fixed top-0 left-0 h-full bg-[#105946] text-white w-64 transform ${
    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-200 ease-in-out z-0`} // Increased z-index for the drawer
>
  <div className="flex flex-col p-4 pt-40 gap-y-5">
    <AddEditProduct actionText="post" />

    <NavLink className="mb-4 mt-3" to="/allOrder">
      <Button
        className="w-full bg-transparent border-2 text-white p-4"
        variant="outline"
      >
        Orders
      </Button>
    </NavLink>

    <NavLink className="mb-4" to="/dashboard">
      <Button
        onClick={() => setPlace(directory)}
        className="w-full bg-transparent border-2 text-white p-4"
        variant="outline"
      >
        Management
      </Button>
    </NavLink>
  </div>
</div>


      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isDrawerOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
