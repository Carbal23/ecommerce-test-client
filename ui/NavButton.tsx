import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  bg?: string;
  h?: string;
  children: React.ReactNode;
};

const NavButton = ({ link, bg, h,  children }: Props) => {
  return (
    <Link
      href={link}
      className={bg && `${bg} hover:${h} bg text-decoration-none flex justify-center align-middle w-28 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2`
      }
    >
      {children}
    </Link>
  );
};

export default NavButton;
