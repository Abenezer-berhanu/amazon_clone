import { Suspense } from "react";
import Box from "../boxes/Box";
import { getAllUsers } from "../../../../Actions/getAllUsers";
import Loader from "@/components/Loader/Loader";

async function Admin_users() {
  const res = await getAllUsers();
  const sellers: any = res?.filter((user: any) => user.role === "seller");
  const buyers: any = res?.filter((user: any) => user.role === "buyer");
  return (
    <>
      <h1 className="my-3 ml-3 text-lg font-semibold sm:text-2xl">All Users</h1>
      <Suspense fallback={<Loader />}>
        <div className="w-full grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          <Box label="Seller" amount={sellers.length} index={1} />
          <Box label="Buyer" amount={buyers?.length | 0} index={2} />
          <Box label="Total" amount={res?.length | 0} index={3} />
          <div className="col-span-3 max-sm:col-span-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-x-auto">
            <table className="table-auto w-full border-none">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                </tr>
              </thead>
              <tbody>
                {res.length > 0
                  ? res.map((user: any) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Admin_users;
