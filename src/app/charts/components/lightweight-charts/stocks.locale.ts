export interface historyParams {
  resolution: string;
  from: string;
  to: string;
}

const USER_ID = 221023;

// export const getIVXParams = (args) => {
//
// }

export const getTSLA = (args: historyParams) => {
  return {
    symbol: 'TSLA:NASDAQ:21400:IVX:221023:rt:30:true',
    resolution: args.resolution,
    from: args.from,
    to: args.to,
    userId: USER_ID.toString(),
    mode: 'rt'
  }
}

export const getAAPL = (args: historyParams) => {
  return {
    symbol: 'AAPL:NASDAQ:799:IVX:221023:rt:30:true',
    resolution: args.resolution,
    from: args.from,
    to: args.to,
    userId: USER_ID.toString(),
    mode: 'rt'
  }
}
