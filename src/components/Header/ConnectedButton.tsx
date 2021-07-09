import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Popover } from "@headlessui/react";

import {
  Fragment,
  useState,
  useRef,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { LCDClient } from "@terra-money/terra.js";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType,
} from "@terra-money/wallet-provider";
import tw, { css } from "twin.macro";
import {
  CheckIcon,
  CreditCardIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
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
  ${tw`inline-flex ml-2 my-4 px-4 py-4 rounded-lg border-pink-light hover:border-pink-light`}
`;

const bgConnectOptionStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  box-shadow: 0px 28px 48px #0f0038;
  ${tw`inline-block align-bottom bg-blue-dark rounded-lg px-2  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6`}
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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const connectedWallet = useConnectedWallet();

  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [bank, setBank] = useState();

  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);

  useEffect(() => {
    if (connectedWallet && lcd) {
      setShowConnectOptions(false);
      lcd.bank.balance(connectedWallet.walletAddress).then((coins) => {
        let uusd = coins.filter((c) => {
          return c.denom === "uusd";
        });
        let ust = parseInt(uusd) / 1000000;
        setBank(ust.toFixed(2).toString());
      });
    } else {
      setBank(null);
    }
  }, [connectedWallet, lcd]);

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
        <>
          <Popover tw="relative">
            <Popover.Button css={connectButtonStyles}>
              <span tw="text-xs mx-4">{bank} UST</span>
            </Popover.Button>

            <Popover.Panel tw="absolute z-10">
              <div tw="bg-white p-4">
                <button onClick={() => disconnect()}>Disconnect</button>
              </div>
            </Popover.Panel>
          </Popover>
        </>
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
            <DialogContent aria-label="dialog" tw="m-auto focus:outline-none">
              <div tw="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <span
                  tw="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div css={bgConnectOptionStyles}>
                  <div tw="pb-8 text-white text-center text-lg font-bold">
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
                            <span tw="ml-4 mr-6">{image}</span>
                            <span tw="text-white font-bold">{label}</span>
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
    </>
  );
};

export default ConnectedButton;
