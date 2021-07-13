const randomNumber = () => {
  const opts: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let number: string = "";
  for (let x = 0; x < 6; x++) {
    const random = Math.floor(Math.random() * opts.length);
    number += opts[random];
  }
  return number;
};

export { randomNumber };
