const USER_ID = 221023;

export const getTSLA = () => {
  return {
    symbol: 'TSLA:NASDAQ:21400:IVX:221023:rt:30:true',
    resolution: '1',
    from: '1626785684',
    to: '1626872144',
    userId: USER_ID.toString(),
    mode: 'rt'
  }
}

export const getAAPL = () => {
  return {
    symbol: 'AAPL:NASDAQ:799:IVX:221023:rt:30:true',
    resolution: '1',
    from: '1627050228',
    to: '1627309488',
    userId: USER_ID.toString(),
    mode: 'rt'
  }
}
