import Link from "next/link"
import { getAllOrders } from "../../../../Actions/getAllOrders"
import { formatDistanceToNow } from "date-fns"

async function Admin_orders() {
  const order = await getAllOrders()
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-x-auto">
            <h1 className="py-3 mb-2 w-full text-lg font-semibold sm:text-2xl bg-slate-200">
              All Orders
            </h1>
            {order?.length > 0 ? <table className="table-auto w-full border-none">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TOTAL PRICE</th>
                  <th>ORDERER ID</th>
                  <th>ORDER ITEMS</th>
                  <th>DATE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {order.length > 0
                  ? order.map((product: any) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.totalPrice}</td>
                        <td>{product.user}</td>
                        <td>{product.orderItems.length || 0}</td>
                        <td>{formatDistanceToNow(new Date(product.createdAt), {addSuffix: true})}</td>
                        <td>
                          <Link
                            href={`/me/product/seller/ordersDetail/${product._id}`}
                            className="text-xs hover:underline"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>: <h1 className="py-3 mb-2 w-full text-lg font-semibold sm:text-2xl bg-slate-200">
              No Order Has Found!
            </h1>}
          </div>
  )
}

export default Admin_orders