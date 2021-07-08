import { forwardRef } from "react";
import tw, { css } from "twin.macro";
import { useRouter } from "next/router";

const navItemStyles = css`
  ${tw`inline-block w-32 h-10 ml-0 xl:ml-4 flex justify-center text-white border border-purple-900 hover:border-purple-700 rounded-lg items-center font-medium`}
`;

const navItemActiveStyles = css`
  background: linear-gradient(
    328.75deg,
    #f042f0 -5.49%,
    #8a249d 19.13%,
    #0f0038 104.44%
  );
  ${tw`border-pink-light hover:border-pink-light`}
`;

const NavItem = forwardRef(
  (props: React.AnchorHTMLAttributes<HTMLAnchorElement>, ref) => {
    const { href, children } = props;
    const router = useRouter();
    const active = router.pathname === href;

    return (
      <>
        <a
          href={href}
          ref={ref}
          css={[navItemStyles, active && navItemActiveStyles]}
        >
          {children}
        </a>
      </>
    );
  }
);

export default NavItem;
