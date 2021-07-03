import Link from "next/link";
import dynamic from "next/dynamic";
import React, { forwardRef } from "react";
import tw, { css } from "twin.macro";

import Image from "next/image";
import lottera from "../assets/loterra.png";

const ConnectedButton = dynamic(() => import("./ConnectedButton"), {
  ssr: false,
});

const navItemStyles = css`
  background: linear-gradient(
    328.75deg,
    #f042f0 -5.49%,
    #8a249d 19.13%,
    #0f0038 104.44%
  );
  ${tw`inline-block w-32 h-10 ml-4 flex justify-center text-white border border-pink-light rounded-lg items-center font-medium`}
`;

const NavItem = forwardRef(({ children, href }, ref) => {
  return (
    <a href={href} ref={ref} css={navItemStyles}>
      {children}
    </a>
  );
});

export default function Header({}) {
  return (
    <header tw="container mx-auto my-4 flex items-center">
      <Link href="/">
        <a tw="flex items-center mr-8">
          <Image src={lottera} alt="Loterra.io" width={80} height={80} />
          <span tw="text-white uppercase text-lg font-black ">Loterra.io</span>
        </a>
      </Link>
      <nav>
        <ul tw="space-x-1 flex">
          <li>
            <Link href="/" passHref>
              <NavItem>Lottery</NavItem>
            </Link>
          </li>
          <li>
            <Link href="/staking" passHref>
              <NavItem>Staking</NavItem>
            </Link>
          </li>
          <li>
            <Link href="/dao" passHref>
              <NavItem>DAO</NavItem>
            </Link>
          </li>
        </ul>
      </nav>
      {/**<ConnectedButton />**/}
    </header>
  );
}
