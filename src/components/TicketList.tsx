import tw, { css } from "twin.macro";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import {
  XIcon,
  PlusCircleIcon,
  TicketIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";

import { ticketListDisplayState } from "../state/dialog";
import { ticketsState } from "../state/user";
import Button from "../components/Button";

const bgStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  box-shadow: 0px 28px 48px #0f0038;
  ${tw`inline-block align-bottom bg-blue-dark rounded-lg px-2 pb-4 text-left shadow-xl transform transition-all my-4 sm:my-8 sm:align-middle sm:max-w-md w-full p-4 sm:p-6`}
`;

export interface TicketListProps {}

const TicketList: React.FC<TicketListProps> = (props) => {
  const [open, setOpen] = useRecoilState(ticketListDisplayState);
  const tickets = useRecoilValue(ticketsState);

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
          <DialogContent aria-label="dialog" tw="m-auto focus:outline-none ">
            <div tw="flex items-end justify-center min-h-screen pt-4  pb-20 text-center sm:block px-0 sm:px-4">
              <span
                tw="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div css={bgStyles}>
                <div tw="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span tw="sr-only">Close</span>
                    <XIcon tw="h-6 w-6 text-blue-200" aria-hidden="true" />
                  </button>
                </div>
                <div tw="pb-12 text-white text-center text-4xl font-bold">
                  Your bag
                </div>
                <div tw="text-white text-xl font-bold">Add some more?</div>
                <div tw="text-gray-400 text-base">
                  we’ve made some easy shortcuts for you
                </div>
                <div tw="flex pt-4">
                  <div tw="inline-flex rounded-md shadow flex-1 text-pink-light">
                    <button
                      type="button"
                      tw="w-full sm:w-32 h-8 inline-flex items-center justify-center border border-pink-light text-sm font-medium rounded-md bg-gray-900 hover:bg-gray-800"
                    >
                      <PlusCircleIcon tw="h-4 w-4 mr-2" aria-hidden="true" />
                      Random
                    </button>
                  </div>

                  <div tw="inline-flex rounded-md shadow flex-1 text-pink-light">
                    <button
                      type="button"
                      tw="w-full sm:w-32 h-8 inline-flex items-center justify-center border border-pink-light text-sm font-medium rounded-md  bg-gray-900 hover:bg-gray-800"
                    >
                      <PlusCircleIcon tw="h-4 w-4 mr-2" aria-hidden="true" />
                      X10
                    </button>
                  </div>

                  <div tw="inline-flex rounded-md shadow flex-1 text-pink-light">
                    <button
                      type="button"
                      tw="w-full sm:w-32 h-8 inline-flex items-center justify-center border border-pink-light text-sm font-medium rounded-md bg-gray-900 hover:bg-gray-800"
                    >
                      <PlusCircleIcon tw="h-4 w-4 mr-2" aria-hidden="true" />
                      X100
                    </button>
                  </div>
                </div>
                <div tw="pt-8 text-gray-400">
                  Total tickets in bag:{" "}
                  <span tw="text-white font-bold">{tickets.length}</span>
                </div>
                <div>
                  <ul tw="pb-4">
                    {tickets.map((ticket) => (
                      <li tw="relative text-white font-bold flex p-3 bg-gray-900 bg-opacity-70 rounded-xl my-3">
                        <TicketIcon
                          tw="h-6 w-6 text-green-light mr-2"
                          aria-hidden="true"
                        />
                        {ticket}
                        <button
                          type="button"
                          tw="absolute right-3 top-3 border rounded-md text-gray-600 border-gray-600 hover:text-gray-400 hover:border-gray-400"
                        >
                          <TrashIcon tw="h-4 w-4 m-1" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div tw="text-center text-gray-400 pb-8">
                  Total:
                  <span tw="ml-1 text-white font-bold">
                    {tickets.length}.00
                    <span tw="ml-1 text-xs font-normal">UST</span>
                  </span>
                </div>
                <div tw="absolute w-11/12 -bottom-8">
                  <div tw="flex justify-center">
                    <Button label="Buy tickets" />
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

export default TicketList;
