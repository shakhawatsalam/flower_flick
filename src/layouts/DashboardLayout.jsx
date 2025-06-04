import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset className='bg-[#F7F7F7]'>
        <SidebarTrigger className='ml-1' />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
