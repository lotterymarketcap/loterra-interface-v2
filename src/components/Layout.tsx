import tw from "twin.macro";

import Header from "./Header/Header";
import AppProviders from "./AppProviders";
/** 
import BgWave1 from "../assets/background-wave-1.svg";
import BgWave2 from "../assets/background-wave-2.svg";
import BgWave3 from "../assets/background-wave-3.svg";
import BgWave4 from "../assets/background-wave-4.svg";
*/

export default function Layout({ children }) {
  return (
    <AppProviders>
      {/** 
      <div tw="absolute h-96 w-screen overflow-hidden">
        <BgWave1 tw="absolute bottom-0" />
        <BgWave2 tw="absolute bottom-0" />
        <BgWave3 tw="absolute bottom-0" />
        <BgWave4 tw="absolute bottom-0" />
      </div>*/}
      <Header />
      {children}
      <footer tw="shadow-inner mt-4">
        <div tw="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"></div>
      </footer>
    </AppProviders>
  );
}
