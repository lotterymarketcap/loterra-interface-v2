import dynamic from "next/dynamic";

const AppProviders = dynamic(() => import("./AppProviders"), {
  ssr: false,
});

const ConnectedButton = dynamic(() => import("./ConnectedButton"), {
  ssr: false,
});

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

export default function Layout({ children }) {
  return (
    <AppProviders>
      <header>{process.browser && <ConnectedButton />}</header>
      {children}
      <footer className="shadow-inner mt-4">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          Footer
        </div>
      </footer>
    </AppProviders>
  );
}
