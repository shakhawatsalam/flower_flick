import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/redux/features/product/productApi";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import CreateFlowerDialog from "@/components/Dialog/CreateFlowerDialog";
import DeleteFlowerDialog from "@/components/Dialog/DeleteFlowerDialog";
import EditFlowerDialog from "@/components/Dialog/EditFlowerDialog";
// "react-confetti-explosion": "^2.1.2",
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            className='group px-2 hover:bg-gray-100 dark:hover:bg-gray-800'
            onClick={() => column.toggleSorting(isSorted === "asc")}>
            <span className='mr-2'>Price</span>
            {isSorted === "asc" ? (
              <ArrowUp className='w-4 h-4 text-muted-foreground group-hover:text-black dark:group-hover:text-white' />
            ) : isSorted === "desc" ? (
              <ArrowDown className='w-4 h-4 text-muted-foreground group-hover:text-black dark:group-hover:text-white' />
            ) : (
              <ArrowUpDown className='w-4 h-4 text-muted-foreground group-hover:text-black dark:group-hover:text-white' />
            )}
          </Button>
        </div>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className='text-center font-medium'>{formatted}</div>;
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
            <DeleteFlowerDialog flower={row.original} />
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                <SquarePen />
              </Button>
            </DialogTrigger>
            <EditFlowerDialog flower={row.original} />
          </Dialog>
        </div>
      );
    },
  },
];

const DashboardFlower = () => {
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });
  const [sorting, setSorting] = useState([]);
  const sortValue =
    sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : "";
  const { data, isFetching, isLoading } = useProductsQuery({
    searchTerm: "",
    categories: "",
    priceRange: ["", ""],
    sortValue,
    page: pagination.pageIndex + 1,
  });
  const pageCount = data?.count
    ? Math.ceil(data.count / pagination.pageSize)
    : -1;
  return (
    <section className='p-10'>
      <div className='h-48 mb-16  border-b border-dashed shadow-2xs'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 lg:p-0'>
          <div>
            <h1 className='font-montserrat text-4xl mb-5'>Flower's List</h1>
            <p className='font-lora text-gray-600 italic text-[18px]'>
              Where flowers are our inspiration
            </p>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'>
                  Create Product
                </Button>
              </DialogTrigger>
              <CreateFlowerDialog setOpen={setOpen} />
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data?.results ?? []}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          pageCount={pageCount}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default DashboardFlower;
