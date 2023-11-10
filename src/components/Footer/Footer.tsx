import logo from "@/Images/amazon_logo.png";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-amazon_light text-white grid md:grid-flow-col place-items-center">
      <Image src={logo} alt="amazon logo" className="h-10 w-12 md:h-12 md:w-28" />
      <p className="text-center text-xs sm:text-sm">
        All right reserved{" "}
        <Link
          href="mailto:abenuberhanu271@gmail.com"
          className="hover:underline"
        >
          @abenuberhanu271@gmail.com
        </Link>
      </p>
    </div>
  );
}

export default Footer;
