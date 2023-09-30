import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideNavbar from "./sideNav/side-navbar";

export const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[40%] p-0 flex gap-0" side="left">
        <SideNavbar />
      </SheetContent>
    </Sheet>
  );
};
