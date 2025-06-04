import { DataTable } from "@/components/DataTable/data-table";
import CreateCategoryDialog from "@/components/Dialog/CreateCategoryDialog";
import DeleteCategoryDialog from "@/components/Dialog/DeleteCategoryDialog";
import EditCategoryDialog from "@/components/Dialog/EditCategoryDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
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
    cell: ({ row }) => {
      return (
        <div className='flex flex-row justify-center gap-3'>
          <Dialog>
            <DialogTrigger>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DeleteCategoryDialog category={row.original} />
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                <SquarePen />
              </Button>
            </DialogTrigger>
            <EditCategoryDialog category={row.original} />
          </Dialog>
        </div>
      );
    },
  },
];
const DashboardCategories = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, isLoading } = useGetAllCategoriesQuery();

  return (
    <section className='p-10'>
      <div className='h-32 mb-20 md:mb-0'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 lg:p-0'>
          <div>
            <h1 className='font-montserrat text-4xl mb-5'>Category List</h1>
            <p className='font-lora text-gray-600 italic text-[18px]'>
              Where flowers are our inspiration
            </p>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'>
                  Create Category
                </Button>
              </DialogTrigger>
              <CreateCategoryDialog open={open} setOpen={setOpen} />
            </Dialog>
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
