import dynamic from "next/dynamic";
import tw from "twin.macro";

import Header from "./Header";

const AppProviders = dynamic(() => import("./AppProviders"), {
  ssr: false,
});

export default function Layout({ children }) {
  return (
    <AppProviders>
      <Header />
      {children}
      <footer tw="shadow-inner mt-4">
        <div tw="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"></div>
      </footer>
    </AppProviders>
  );
}
