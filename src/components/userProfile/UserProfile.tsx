import { getUserInfo } from "../../../Actions/findUser";
async function UserProfile({ id }: any) {
  const { res }: any = await getUserInfo(id);
  return (
    <div className=" mt-[40px] flex flex-col gap-1 font-serif items-center">
      <p>{res.username}</p>
      <p>{res.email}</p>
      <p>{res.role}</p>
    </div>
  );
}

export default UserProfile;
