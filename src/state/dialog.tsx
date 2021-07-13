import { atom } from "recoil";

export const ticketSelectDisplayState = atom({
  key: "ticketSelectDisplayState",
  default: false,
});

export const ticketListDisplayState = atom({
  key: "ticketListDisplayState",
  default: false,
});
