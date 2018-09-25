const logger = require('../tools/logger').application
const ip2geo = require('../tools/ip2geo')

const FILE_PATH = '/home/work/kdd/data.csv'
const LEVEL_COLOR = [
    '_',
    'red',
    'orange',
    'yellow',
    'blue',
    'green'
]

module.exports = {
    getEchartsData,
    getOriginAndEchartsData
}

async function getOriginAndEchartsData() {
    let data = await data2json(FILE_PATH)
    return {
        origin: data,
        echarts: data2echarts(data)
    }
}

async function getEchartsData() {
    let data = await data2json(FILE_PATH)
    return data2echarts(data)
}

async function data2json(filePath) {
    // TODO
    return DEMO_DATA
}

function data2echarts(data) {
    var res = []
    data.forEach(function (data) {
        var _res = {}
        var _level = 0
        if (data.event == 'dos')            _level = 1
        else if (data.event == 'r2l')       _level = 2
        else if (data.event == 'u2r')       _level = 3
        else if (data.event == 'probing')   _level = 4
        else                                _level = 5
        // 分析数据并写入经纬度
        _res.coords = [ip2geo(data.sourceIP), ip2geo(data.targetIP)]
        _res.lineStyle = {
            normal: {
                // color: echarts.color.modifyHSL('#5A94DF', _level * 10)
                color: LEVEL_COLOR[_level] // TODO: 颜色随机
            }
        }
        res.push(_res)
    })
    return res
}

const DEMO_DATA = [
    {
        sourceIP: '45.63.60.243',
        targetIP: '202.204.48.82',
        event: 'dos',
        payload: '/admin',
    },
    {
        sourceIP: '175.45.20.138',
        targetIP: '202.204.48.82',
        event: 'r2l'
    },
    {
        sourceIP: '176.192.102.130',
        targetIP: '202.204.48.82',
        event: 'u2r'
    },
    {
        sourceIP: '133.242.187.207',
        targetIP: '202.204.48.82',
        event: 'probing'
    },
    {
        sourceIP: '61.131.24.0',
        targetIP: '202.204.48.82',
        event: 'scan'
    }
]