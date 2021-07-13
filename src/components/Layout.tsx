import tw from "twin.macro";

import Header from "./Header/Header";
import AppProviders from "./AppProviders";
import TicketList from "./TicketList";

export default function Layout({ children }) {
  return (
    <AppProviders>
      <Header />
      {children}
      <TicketList />
      <footer tw="shadow-inner mt-4">
        <div tw="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"></div>
      </footer>
    </AppProviders>
  );
}
