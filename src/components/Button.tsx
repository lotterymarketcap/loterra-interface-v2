import tw, { css } from "twin.macro";

export interface ButtonProps {
  label: string;
}

const buttonStyles = css`
  background: linear-gradient(
      92.8deg,
      rgba(255, 255, 255, 0.6) -1.42%,
      rgba(205, 21, 205, 0.318) 102.82%
    ),
    #ff36ff;
  box-shadow: 0px 0px 12px #ff36ff, inset 0px -2px 0px #ff36ff;
  ${tw`w-60 h-12 md:w-80 md:h-16 text-white font-bold text-center text-xl md:text-2xl rounded-3xl`}
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { label } = props;

  return (
    <>
      <button type="button" css={buttonStyles} {...props}>
        {label}
      </button>
    </>
  );
};

export default Button;
