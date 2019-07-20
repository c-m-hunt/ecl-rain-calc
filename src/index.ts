export interface Response {
  target: number;
  overs: number;
  maxPerBowler: number;
  powerPlay: number;
}

export const firstInningsTimeLost = (
  total: number,
  oversTarget: number,
  oversCompleted: number,
  minutesLost: number,
  teaTaken: boolean,
): Response => {
  const runRate = total / oversTarget;
  const overMinutes = 8;
  let minutesLostIncTea = teaTaken ? minutesLost - 30 : minutesLost;
  // Remove the 30 free minutes
  minutesLostIncTea = minutesLostIncTea - 30;
  minutesLostIncTea = Math.floor(minutesLostIncTea / overMinutes) * overMinutes;
  const oversLost = minutesLostIncTea / overMinutes;
  const overs = oversTarget - oversLost + (oversTarget - Math.ceil(oversCompleted));
  const targetRunRate = ((100 + (oversTarget - overs) * 1.5) * runRate) / 100;

  if (overs < 20) {
    throw Error('Less than 20 overs available - ABANDON GAME');
  }

  if (minutesLostIncTea < 0) {
    throw Error('Not enough time lost - no change in game conditions');
  }

  let powerPlay = 6;
  if (overs >= 20 && overs <= 23) {
    powerPlay = 6;
  } else if (overs >= 24 && overs <= 26) {
    powerPlay = 7;
  } else if (overs >= 27 && overs <= 29) {
    powerPlay = 8;
  } else if (overs >= 30 && overs <= 33) {
    powerPlay = 9;
  } else if (overs >= 34 && overs <= 36) {
    powerPlay = 10;
  } else if (overs >= 37 && overs <= 39) {
    powerPlay = 11;
  } else if (overs >= 40 && overs <= 45) {
    powerPlay = 12;
  }

  return {
    maxPerBowler: Math.floor(overs / 5),
    overs,
    powerPlay,
    target: Math.ceil(targetRunRate * overs),
  };
};
