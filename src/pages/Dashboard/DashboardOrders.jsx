import { DataTable } from "@/components/DataTable/data-table";
import OrderDetailsDialog from "@/components/Dialog/OrderDetailsDialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useGetOrderQuery } from "@/redux/features/order/orderApi";
import { Dialog } from "@radix-ui/react-dialog";
import { ListCollapse, Wrench } from "lucide-react";
import React from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total_price",
    header: "Total price",
  },
  {
    accessorKey: "created_at",
    header: "Order date",
  },
  {
    id: "actions",
    header: () => <div className='text-center'>Change Status</div>,
    cell: ({ row }) => {
      return (
        <div className='flex flex-row justify-center gap-3'>
          {/* <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
            Change Status
            <Wrench />
          </Button> */}
          <Dialog>
            <DialogTrigger>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                See Details
                <ListCollapse />
              </Button>
            </DialogTrigger>
            <OrderDetailsDialog order={row.original} />
          </Dialog>
        </div>
      );
    },
  },
];
const DashboardOrders = () => {
  const { data, isLoading, isFetching } = useGetOrderQuery();
  console.log(data);
  return (
    <section className='p-10'>
      <div className='h-48 mb-16  border-b border-dashed shadow-2xs'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 lg:p-0'>
          <div>
            <h1 className='font-montserrat text-4xl mb-5'>Order List</h1>
            <p className='font-lora text-gray-600 italic text-[18px]'>
              Where flowers are our inspiration
            </p>
          </div>
          {/* <div>
            <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'>
              Update Order
            </Button>
          </div> */}
        </div>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data ?? []}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default DashboardOrders;
