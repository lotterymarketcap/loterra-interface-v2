import tw, { css } from "twin.macro";

export interface JackpotProps {
  label: string;
  amount: number;
}

const backgroundStyles = css`
  background: linear-gradient(
    0deg,
    rgba(14, 0, 52, 0) 0%,
    rgba(14, 0, 52, 0.3) 53.08%,
    rgba(14, 0, 52, 0) 53.09%,
    rgba(14, 0, 52, 0) 106.17%
  );
  ${tw`m-4 text-center text-5xl text-white font-black bg-gray-900 px-12 py-2 border border-gray-800 rounded-xl`}
`;

const labelStyles = css`
  text-shadow: 0px 0px 26px #ff36ff;
  ${tw`w-full inline-block text-center text-3xl text-pink-dark text-center uppercase`}
`;

const Jackpot: React.FC<JackpotProps> = (props) => {
  const { label, amount } = props;

  return (
    <>
      <span css={labelStyles}>{label}</span>
      <div tw="flex justify-center">
        <span css={backgroundStyles}>
          {amount.toLocaleString("en-US")}
          <span tw="text-green-500 text-xl font-normal ml-4">UST</span>
        </span>
      </div>
    </>
  );
};

export default Jackpot;
