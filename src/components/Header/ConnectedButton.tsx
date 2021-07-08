import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import tw, { css } from "twin.macro";
import { CreditCardIcon } from "@heroicons/react/outline";

export interface ConnectedButtonProps {}

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
    connect,
    disconnect,
  } = useWallet();

  return (
    <>
      {status === WalletStatus.WALLET_NOT_CONNECTED ? (
        <>
          <button type="button" css={connectButtonStyles} onClick={() => {}}>
            <CreditCardIcon tw="h-5 w-8 ml-2" aria-hidden="true" />
            <span tw="text-xs md:text-base mr-4">Connect</span>
          </button>
        </>
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : null}

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
