


const mockComparePriceData = () => {
  return new Array(10).fill(1).reduce((preItem, currItem, index) => {
    const res = [
      { key: 1, time: 2 + (index * 8), name: '爱心人寿保险', value: Math.floor(10 + (index + 1) * 3) },
      { key: 2, time:  2 + (index * 8), name: '奇怪保险', value: Math.floor(2 + (index + 1) * 2) },
    ]

    if (index === 4) {
      res[1] = {
        ...res[1],
        value: res[1].value + 4,
      }
    }

    if (index < 4) {
      res.shift();
    }
    if (index === 4) {
      res[0] = {
        ...res[0],
        value: 0,
      }
    }
    preItem = preItem.concat(res);
    return preItem;
  }, [])
}

export default  {
  values: mockComparePriceData(),
};
