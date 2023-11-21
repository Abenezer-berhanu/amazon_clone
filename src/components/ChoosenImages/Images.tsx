import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";

function Images({ url, click }: any) {
  return (
    <div className="flex flex-col text-lg flex-shrink-0">
      <Image src={url} alt="chosen image" width={80} height={120} />
      <MdOutlineDelete className="text-red-800" onClick={click}/>
    </div>
  );
}

export default Images;
