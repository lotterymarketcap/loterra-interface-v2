import { useRecoilState } from "recoil";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import tw, { css } from "twin.macro";
import { ticketListDisplayState } from "../../state/dialog";

export interface CartProps {}

const Cart: React.FC<CartProps> = (props) => {
  const [open, setOpen] = useRecoilState(ticketListDisplayState);
  return (
    <>
      <button
        type="button"
        tw="inline-block w-12 h-10 ml-4 flex justify-center text-white border border-purple-900 hover:border-purple-700 rounded-lg items-center font-medium"
        onClick={() => setOpen(true)}
      >
        <ShoppingCartIcon tw="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
};

export default Cart;
