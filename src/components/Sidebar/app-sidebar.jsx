import {
  Home,
  ChartBarStacked,
  ShoppingBasket,
  SquareKanban,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Flowers",
    url: "/dashboard/flowers",
    icon: SquareKanban,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingBasket,
  },
];

export function AppSidebar({ ...props }) {
  const { pathname } = useLocation();
  return (
    <Sidebar {...props} className='font-montserrat'>
      <SidebarHeader>
        {/* Logo */}
        <h1 className='text-2xl font-playfair uppercase tracking-wider'>
          <Link to='/'>
            <span className='text-[#F34F3F]'>Flower</span> Flick
          </Link>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`h-14 tracking-wider hover:bg-[#fac7c2] transition-all duration-150  ${
                      item.url === pathname && "bg-[#F34F3F] text-white"
                    }`}
                    asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
