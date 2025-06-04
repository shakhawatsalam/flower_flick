import {
  Home,
  ChartBarStacked,
  ShoppingBasket,
  SquareKanban,
  ShoppingCart,
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
import { useSelector } from "react-redux";

// Menu admin.
const admin = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Cart",
    url: "/dashboard/my-cart",
    icon: ShoppingCart,
  },
  {
    title: "My Orders",
    url: "/dashboard/my-orders",
    icon: ShoppingBasket,
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

const user = [
  {
    title: "My Cart",
    url: "/dashboard/my-cart",
    icon: ShoppingCart,
  },
  {
    title: "My Orders",
    url: "/dashboard/my-orders",
    icon: ShoppingBasket,
  },
];

export function AppSidebar({ ...props }) {
  const { pathname } = useLocation();
  const { user: currentUser } = useSelector((state) => state.userSlice);

  const menuItems = currentUser?.is_staff ? admin : user;

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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`h-14 tracking-wider hover:bg-[#fac7c2] transition-all duration-150 text-[16px] ${
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
