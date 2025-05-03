import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/redux/features/category/categoryApi";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: () => <div className='text-center'>Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className='flex flex-row justify-center gap-3'>{name}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className='text-center'>Action</div>,
    cell: () => {
      return (
        <div className='flex flex-row justify-center gap-3'>
          <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
            <Trash2 />
          </Button>
          <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
            <SquarePen />
          </Button>
        </div>
      );
    },
  },
];
const DashboardCategories = () => {
  const { data, isFetching, isLoading } = useCategoriesQuery();

  return (
    <section className='p-10'>
      <div className='h-48 mb-16  border-b border-dashed shadow-2xs'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 lg:p-0'>
          <div>
            <h1 className='font-montserrat text-4xl mb-5'>Category List</h1>
            <p className='font-lora text-gray-600 italic text-[18px]'>
              Where flowers are our inspiration
            </p>
          </div>
          <div>
            <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'>
              Create Category
            </Button>
          </div>
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

export default DashboardCategories;
