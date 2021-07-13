import tw, { css } from "twin.macro";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { XIcon } from "@heroicons/react/outline";

import { ticketSelectDisplayState } from "../../state/dialog";
import Button from "../Button";

const bgStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  box-shadow: 0px 28px 48px #0f0038;
  ${tw`inline-block align-bottom bg-blue-dark rounded-lg px-2  pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full p-4 sm:p-6`}
`;

export interface TicketSelectProps {}

const TicketSelect: React.FC<TicketSelectProps> = (props) => {
  const [open, setOpen] = useRecoilState(ticketSelectDisplayState);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <DialogOverlay
      isOpen={open}
      onDismiss={(): void => setOpen(false)}
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
              <div css={bgStyles}>
                <div tw="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span tw="sr-only">Close</span>
                    <XIcon tw="h-6 w-6 text-blue-200" aria-hidden="true" />
                  </button>
                </div>
                <div tw="pb-2 text-white text-center text-4xl font-bold">
                  Buy tickets
                </div>
                <div tw="pb-8 text-gray-400 text-center text-xl">
                  Create your own combinations
                </div>
                <div tw="absolute w-11/12 -bottom-8">
                  <div tw="flex justify-center">
                    <Button label="Add to cart" />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </DialogOverlay>
  );
};

export default TicketSelect;
