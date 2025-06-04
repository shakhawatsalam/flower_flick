import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetOrderQuery,
  usePaymentInitiateMutation,
} from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardMyOrder = () => {
  const { data, isLoading: isOrderLoading } = useGetOrderQuery();
  const [paymentInitiate, { isLoading }] = usePaymentInitiateMutation();
  console.log(data);
  const handlePayment = async (amount, orderId) => {
    try {
      const data = {
        amount,
        orderId,
      };
      const paymentResponse = await paymentInitiate(data).unwrap();

      if (paymentResponse.payment_url) {
        window.location.href = paymentResponse.payment_url;
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.log("error initiating payment", error);
    }
  };

  return (
    <section className='p-4 md:p-10'>
      <div className='mb-8'>
        <h1 className='font-playfair text-3xl md:text-4xl mb-4'>My Orders</h1>
        <p className='font-lora text-gray-600 italic text-[16px] md:text-[18px]'>
          Track and manage your orders
        </p>
      </div>

      {isOrderLoading ? (
        <div className='font-montserrat'>
          <div className='bg-[#FAFAF9] flex items-center justify-between p-4 rounded-lg mb-6'>
            <div>
              <Skeleton className='h-6 w-32 mb-2' />
              <Skeleton className='h-4 w-24' />
            </div>
            <div>
              <Skeleton className='h-6 w-20' />
            </div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-sm'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className='text-center'>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className='h-4 w-32' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-20' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-4 w-16' />
                      </TableCell>
                      <TableCell className='text-center'>
                        <Skeleton className='h-4 w-20' />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          {data?.map((item) => (
            <div
              key={item.id}
              className='font-montserrat bg-white rounded-lg shadow-sm overflow-hidden'>
              <div className='bg-[#FAFAF9] flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b'>
                <div>
                  <h2 className='text-xl font-semibold'>Order #{item.id}</h2>
                  <p className='text-sm text-gray-600 mt-1'>
                    Placed on: {item.created_at}
                  </p>
                </div>
                <div className='mt-2 md:mt-0'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className='p-4 overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className='text-center'>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item?.items?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.flower.title}</TableCell>
                        <TableCell>${product.flower.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className='text-center'>
                          ${product.total_price}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className='font-semibold'>
                      <TableCell colSpan={3} className='text-end'>
                        Total Price:
                      </TableCell>
                      <TableCell className='text-center'>
                        ${item.total_price}
                      </TableCell>
                    </TableRow>
                    {item.status === "Pending" && (
                      <TableRow className='font-semibold'>
                        <TableCell colSpan={4}>
                          <Button
                            disabled={isLoading}
                            onClick={() =>
                              handlePayment(item.total_price, item.id)
                            }
                            className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-14 float-right'>
                            {isLoading ? "Paying..." : "Pay Now"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardMyOrder;
