import tw, { css } from "twin.macro";

export interface StatCardProps {
  label: string;
  amount: number;
}

const backgroundStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  ${tw`relative w-full sm:w-72 rounded-xl flex space-x-3 px-8 py-4 mx-4`}
`;

const StatCard: React.FC<StatCardProps> = (props) => {
  const { label, amount, children } = props;

  return (
    <div css={backgroundStyles}>
      <div tw="flex-shrink-0">{children}</div>
      <div tw="flex-1 min-w-0">
        <span tw="absolute inset-0" aria-hidden="true" />
        <span tw="block text-pink-dark font-normal">{label}</span>
        <span tw="text-white font-bold text-2xl">
          {amount.toLocaleString("fi-FI")}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
