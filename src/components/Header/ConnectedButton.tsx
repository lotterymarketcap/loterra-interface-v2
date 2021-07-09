import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Fragment, useState, useRef, ReactNode } from "react";
import {
  useWallet,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";
import { CheckIcon } from "@heroicons/react/outline";
import tw, { css } from "twin.macro";
import { CreditCardIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";

import Terra from "../../assets/terra.svg";
import WalletConnect from "../../assets/walletconnect.svg";

export interface ConnectedButtonProps {}

const connectOptionStyles = css`
  background: linear-gradient(
    328.75deg,
    #f042f0 -5.49%,
    #8a249d 19.13%,
    #0f0038 104.44%
  );
  ${tw`inline-flex m-4 px-8 py-4 rounded border-pink-light hover:border-pink-light`}
`;

const size = { width: 24, height: 24 };

const connectButtonStyles = css`
  background: linear-gradient(
      92.8deg,
      rgba(255, 255, 255, 0.6) -1.42%,
      rgba(10, 176, 96, 0.6) 102.82%
    ),
    #20ff93;
  box-shadow: 0px 0px 33px #20ff93;
  ${tw`inline-flex m-4 items-center bg-green-light py-1.5 border border-transparent font-medium rounded shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-light`}
`;

const ConnectedButton: React.FC<ConnectedButtonProps> = (props) => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    install,
    connect,
    disconnect,
  } = useWallet();

  const [showConnectOptions, setShowConnectOptions] = useState(false);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  type Button = { label: string; image: ReactNode; onClick: () => void };
  const buttons = ([] as Button[])
    .concat(
      availableInstallTypes.includes(ConnectType.CHROME_EXTENSION)
        ? {
            label: "Terra Station Extension",
            image: <Terra {...size} />,
            onClick: () => install(ConnectType.CHROME_EXTENSION),
          }
        : []
    )
    .concat(
      availableConnectTypes.includes(ConnectType.WEBEXTENSION)
        ? {
            label: "Terra Station Extension",
            image: <Terra {...size} />,
            onClick: () => connect(ConnectType.WEBEXTENSION),
          }
        : availableConnectTypes.includes(ConnectType.CHROME_EXTENSION)
        ? {
            label: "Terra Station Extension",
            image: <Terra {...size} />,
            onClick: () => connect(ConnectType.CHROME_EXTENSION),
          }
        : []
    )
    .concat(
      availableConnectTypes.includes(ConnectType.WALLETCONNECT)
        ? {
            label: "Terra Station Mobile",
            image: <WalletConnect {...size} />,
            onClick: () => connect(ConnectType.WALLETCONNECT),
          }
        : []
    );

  return (
    <>
      {status === WalletStatus.WALLET_NOT_CONNECTED ? (
        <>
          <button
            type="button"
            css={connectButtonStyles}
            onClick={() => setShowConnectOptions(true)}
          >
            <CreditCardIcon tw="h-5 w-8 ml-2" aria-hidden="true" />
            <span tw="text-xs md:text-base mr-4">Connect</span>
          </button>
        </>
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : null}

      <DialogOverlay
        isOpen={showConnectOptions}
        onDismiss={(): void => setShowConnectOptions(false)}
        aria-label="dialog"
        tw="fixed bg-black bg-opacity-80 shadow-2xl top-0 right-0 bottom-0 left-0 z-10 overflow-y-scroll"
      >
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
          >
            <DialogContent
              aria-label="dialog"
              tw="m-auto md:mt-11 focus:outline-none"
            >
              <div tw="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <span
                  tw="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div tw="inline-block align-bottom bg-blue-dark rounded-lg px-4  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                  <div tw="pb-8 text-white text-center text-xl font-bold">
                    Connect to a wallet
                  </div>
                  <div>
                    <>
                      {Object.entries(buttons).map(
                        ([key, { label, image, onClick }]) => (
                          <button
                            css={connectOptionStyles}
                            onClick={onClick}
                            key={key}
                            tw="w-80"
                          >
                            {image}
                            <span tw="ml-4 text-white font-bold">{label}</span>
                          </button>
                        )
                      )}
                    </>
                  </div>
                </div>
              </div>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      </DialogOverlay>

      {/** 
      <section>
        <pre>
          {JSON.stringify(
            {
              status,
              network,
              wallets,
              availableConnectTypes,
            },
            null,
            2
          )}
        </pre>
      </section>

      <section>
        {status === WalletStatus.WALLET_NOT_CONNECTED ? (
          <>
            {availableConnectTypes.map((connectType) => (
              <button key={connectType} onClick={() => connect(connectType)}>
                Connect with {connectType}
              </button>
            ))}
          </>
        ) : status === WalletStatus.WALLET_CONNECTED ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : null}
      </section>*/}
    </>
  );
};

export default ConnectedButton;
