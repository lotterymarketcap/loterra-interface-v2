import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

export default function ConnectedButton({}) {
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

      <section style={{ margin: "20px 0" }}>
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
      </section>
    </>
  );
}
