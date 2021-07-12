import tw, { css } from "twin.macro";
import { useEffect, useState, useCallback } from "react";
import useCountDown from "../hooks/useCountDown";

const toDays = (duration) => {
  return Math.floor(duration / (1000 * 60 * 60 * 24));
};
const toHours = (duration) => {
  return Math.floor((duration / (1000 * 60 * 60)) % 24);
};
const toMinutes = (duration) => {
  return Math.floor((duration / 1000 / 60) % 60);
};
const toSeconds = (duration) => {
  return Math.floor((duration / 1000) % 60);
};

export interface CountdownProps {
  targetDate: number;
}

const Countdown: React.FC<CountdownProps> = (props) => {
  const { targetDate } = props;
  const [timeLeft, { start }] = useCountDown(
    targetDate - new Date().getTime(),
    1000
  );

  useEffect(() => {
    start();
  }, []);

  return (
    <div tw="w-96">
      <div tw="text-center text-white opacity-50 text-lg md:text-xl">
        Next draw in
      </div>
      <div tw="m-3">
        <div tw="h-3 relative max-w-xl rounded-full overflow-hidden border border-gray-800">
          <div tw="w-full h-full bg-gray-900 absolute"></div>
          <div tw="h-full bg-green-light relative  rounded-full w-3/5"></div>
        </div>
      </div>
      <div tw="pt-4 text-5xl md:text-6xl text-center flex items-center justify-center">
        <div tw=" p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Days</div>
          <div tw="font-bold" x-text="days">
            {toDays(timeLeft)}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw=" p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Hours</div>
          <div tw="font-bold" x-text="hours">
            {toHours(timeLeft)}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw=" p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Minutes</div>
          <div tw="font-bold" x-text="minutes">
            {toMinutes(timeLeft)}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw="p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Seconds</div>
          <div tw="font-bold" x-text="seconds">
            {toSeconds(timeLeft)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
