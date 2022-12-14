const Mock = require('mockjs');

const xDataList = {
  day: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
  month: Mock.Random.range(1, 31),
  year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  allyears: ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年'],
  provinces: ['广东省', '北京市', ' 河北省', '湖南省', '广西省', '浙江省', '重庆市', '湖北省', '江苏省', '山东省']
};

function lineData(type) {
  return Array.from({ length: xDataList[type].length }, () => {
    return Mock.mock('@natural(20,2000)');
  });
}

function rankData() {
  let obj = Mock.mock({
    'name|10': {
      广东省: '@natural(20,200)',
      北京市: '@natural(20,200)',
      河北省: '@natural(20,200)',
      湖南省: '@natural(20,200)',
      广西省: '@natural(20,200)',
      浙江省: '@natural(20,200)',
      重庆市: '@natural(20,200)',
      湖北省: '@natural(20,200)',
      江苏省: '@natural(20,200)',
      山东省: '@natural(20,200)'
    }
  });
  let list = [];
  for (let i in obj.name) {
    list.push({
      area: i,
      value: obj.name[i]
    });
  }
  return list.sort((a, b) => {
    return b.value - a.value;
  });
}

function pieData() {
  let obj = Mock.mock({
    'name|6': {
      学校数: '@natural(100,500)',
      学生数: '@natural(100,500)',
      计算机台数: '@natural(100,500)',
      平板数: '@natural(100,500)',
      多媒体教室数: '@natural(100,500)',
      微机室面积: '@natural(100,500)',
      信息老师数: '@natural(100,500)'
    }
  });
  let list = [];
  for (let i in obj.name) {
    list.push({
      name: i,
      value: obj.name[i]
    });
  }
  return list;
}

function hotData() {
  let obj = Mock.mock({
    'name|15': {
      双减政策: '@natural(500,2000)',
      教培机构转型: '@natural(500,2000)',
      美育进中考: '@natural(500,2000)',
      中考体育改革: '@natural(500,2000)',
      家庭教育促进法: '@natural(500,2000)',
      职业教育: '@natural(500,2000)',
      教育扶贫: '@natural(500,2000)',
      双轨制: '@natural(500,2000)',
      停课不停学: '@natural(500,2000)',
      返校复课: '@natural(500,2000)',
      心理健康教育: '@natural(500,2000)',
      高考延期: '@natural(500,2000)',
      线上教学: '@natural(500,2000)'
    }
  });
  let list = [];
  for (let i in obj.name) {
    list.push({
      name: i,
      value: obj.name[i]
    });
  }
  return list;
}

function moreData() {
  let obj = Mock.mock({
    'name|6': {
      星期一: '@natural(500,2000)',
      星期二: '@natural(500,2000)',
      星期三: '@natural(500,2000)',
      星期四: '@natural(500,2000)',
      星期五: '@natural(500,2000)',
      星期六: '@natural(500,2000)',
      星期天: '@natural(500,2000)'
    }
  });
  let list = [];
  for (let i in obj.name) {
    let random = Math.floor(Math.random() * obj.name[i]);
    list.push({
      name: i,
      male: random,
      female: obj.name[i] - random,
      value: obj.name[i]
    });
  }
  return list;
}

module.exports = [
  {
    url: '/dashboard/lineChart',
    type: 'post',
    response: config => {
      const { type } = config.body;
      return {
        data: {
          xData: xDataList[type],
          yData: lineData(type),
          lastData: lineData(type)
        },
        code: 200,
        message: '数据获取成功'
      };
    }
  },
  {
    url: '/dashboard/rankData',
    type: 'post',
    response: config => {
      return {
        data: rankData(),
        code: 200,
        message: '数据获取成功'
      };
    }
  },
  {
    url: '/dashboard/pieTypeData',
    type: 'post',
    response: config => {
      return {
        data: pieData(),
        code: 200,
        message: '数据获取成功'
      };
    }
  },
  {
    url: '/dashboard/hotSearchData',
    type: 'post',
    response: config => {
      return {
        data: hotData(),
        code: 200,
        message: '数据获取成功'
      };
    }
  },
  {
    url: '/dashboard/moreData',
    type: 'post',
    response: config => {
      return {
        data: moreData(),
        code: 200,
        message: '数据获取成功'
      };
    }
  }
];
