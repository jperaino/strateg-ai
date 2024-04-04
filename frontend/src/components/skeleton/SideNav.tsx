import { Home, Package2, PanelLeft, Settings, Wallet } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import React from "react";

const SideNav = () => {
  const sideNavItems: { label: string; to: string; icon: JSX.Element }[] = [
    {
      label: "Home",
      to: "/",
      icon: <Home />,
    },
    {
      label: "Budget",
      to: "/budget",
      icon: <Wallet />,
    },
  ];

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            {sideNavItems.map((sideNavItem, i) => (
              <Link
                key={i}
                to={sideNavItem.to}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {React.cloneElement(sideNavItem.icon, {
                  className: "h-5 w-5",
                })}
                <p>{sideNavItem.label}</p>
                <span className="sr-only">{sideNavItem.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {sideNavItems.map((sideNavItem, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Link
                  to={sideNavItem.to}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {React.cloneElement(sideNavItem.icon, {
                    className: "h-5 w-5",
                  })}
                  <span className="sr-only">{sideNavItem.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{sideNavItem.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
