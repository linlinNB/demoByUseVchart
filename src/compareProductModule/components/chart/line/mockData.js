


const mockComparePriceData = () => {
  return new Array(10).fill(1).reduce((preItem, currItem, index) => {
    const res = [
      {
        key: 1,
        time: 2 + (index * 8),
        name: '爱心人寿保险',
        value: Math.floor(10 + (index + 1) * 1.6),
        initValue: 10,
      },
      {
        key: 2,
        time:  2 + (index * 8),
        name: '奇怪保险',
        value: Math.floor(6 + (index + 1) * 2.2),
        initValue: 6,
      },
    ]

    if (index === 4) {
      res[1] = {
        ...res[1],
        value: res[1].value + 4,
      }
    }

    if (index === 5) {
      res[1] = {
        ...res[1],
        value: res[1].value + 2,
      }
    }
    preItem = preItem.concat(res);
    return preItem;
  }, [])
}

export default  {
  values: mockComparePriceData(),
};
