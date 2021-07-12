import tw, { css } from "twin.macro";
import { useEffect, useState, useCallback } from "react";
import { useTimer } from "react-timer-hook";

export interface CountdownProps {
  expiryTimestamp: number;
}

const Countdown: React.FC<CountdownProps> = (props) => {
  const { expiryTimestamp } = props;

  const { seconds, minutes, hours, days, restart } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    if (
      expiryTimestamp >
      1 /** in ordder to avoid unnecessary re-rendering/ layout */
    )
      restart(expiryTimestamp);
  }, [expiryTimestamp]);

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
            {expiryTimestamp > 1 ? days.toString().padStart(2, 0) : "-"}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw=" p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Hours</div>
          <div tw="font-bold" x-text="hours">
            {expiryTimestamp > 1 ? hours.toString().padStart(2, 0) : "-"}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw=" p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Minutes</div>
          <div tw="font-bold" x-text="minutes">
            {expiryTimestamp > 1 ? minutes.toString().padStart(2, 0) : "-"}
          </div>
        </div>
        <div tw="text-5xl md:text-6xl text-white font-bold">:</div>
        <div tw="p-2 text-white rounded-lg">
          <div tw="text-sm text-gray-500">Seconds</div>
          <div tw="font-bold" x-text="seconds">
            {expiryTimestamp > 1 ? seconds.toString().padStart(2, 0) : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
