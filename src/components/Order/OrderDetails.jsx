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
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
const OrderDetails = () => {
  const { data, isLoading: isOrderLoading } = useGetOrderQuery();
  console.log(data);
  const [paymentInitiate, { isLoading }] = usePaymentInitiateMutation();

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
    <section className='container mx-auto max-w-7xl mb-[20vh]'>
      <h1 className='font-playfair text-3xl tracking-wider'>Order Details</h1>
      {isOrderLoading ? (
        <div className=' font-montserrat my-14'>
          <div className='bg-[#FAFAF9] flex items-center justify-between p-3'>
            <div>
              <Skeleton className='h-4 w-4 mb-3' />
              <Skeleton className='h-4 w-4' />
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <div className='p-3'>
            {/* <div className='flex items-center justify-between p-3'>
              <div>
                <h1 className='text-xl font-semibold'>Order Id: #{item.id}</h1>
                <p className='text-sm my-2'>Placed ON: {item.created_at}</p>
              </div>
              <div>
                <p>{item.status}</p>
              </div>
            </div> */}
            <div>
              <Table className='font-montserrat tracking-wider'>
                <TableHeader>
                  <TableRow>
                    <TableHead className=''>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className=''>Quantity</TableHead>
                    <TableHead className='text-center'>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className='h-4 w-20' />
                        </TableCell>
                        <TableCell>
                          <Skeleton className='h-4 w-20' />
                        </TableCell>
                        <TableCell>
                          <Skeleton className='h-4 w-20' />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Skeleton className='h-4 w-20' />
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow className='font-semibold'>
                    <TableCell colSpan={3} className='text-end'>
                      Total Price:
                    </TableCell>
                    <TableCell className='text-center '></TableCell>
                  </TableRow>
                  <TableRow className='font-semibold'>
                    <TableCell colSpan={4}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        data?.map((item) => (
          <div key={item.id} className=' font-montserrat my-14'>
            <div className='bg-[#FAFAF9] flex items-center justify-between p-3'>
              <div>
                <h1 className='text-xl font-semibold'>Order Id: #{item.id}</h1>
                <p className='text-sm my-2'>Placed ON: {item.created_at}</p>
              </div>
              <div>
                <p>{item.status}</p>
              </div>
            </div>
            <div className='p-3'>
              {/* <div className='flex items-center justify-between p-3'>
              <div>
                <h1 className='text-xl font-semibold'>Order Id: #{item.id}</h1>
                <p className='text-sm my-2'>Placed ON: {item.created_at}</p>
              </div>
              <div>
                <p>{item.status}</p>
              </div>
            </div> */}
              <div>
                <Table className='font-montserrat tracking-wider'>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className=''>Quantity</TableHead>
                      <TableHead className='text-center'>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item?.items.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.flower.title}</TableCell>
                        <TableCell>{product.flower.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className='text-center'>
                          {product.total_price}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className='font-semibold'>
                      <TableCell colSpan={3} className='text-end'>
                        Total Price:
                      </TableCell>
                      <TableCell className='text-center '>
                        {item.total_price}
                      </TableCell>
                    </TableRow>
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
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default OrderDetails;
