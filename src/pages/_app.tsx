import { RecoilRoot } from "recoil";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
