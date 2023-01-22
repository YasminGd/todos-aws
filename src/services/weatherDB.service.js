const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })
AWS.config.credentials = new AWS.Credentials(process.env.REACT_APP_ACCESS_KEY_ID, process.env.REACT_APP_SECRET_ACCESS_KEY)

const ddb = new AWS.DynamoDB()

export const WeatherDBService = {
    putInDB,
    getFromDB
}

async function putInDB(item) {
    const putParams = {
        TableName: 'WeatherTable',
        Item: {
            'cityName': { S: item.cityName },
            'temprature': { N: item.temprature.toString() },
            'lastUpdated': { N: item.lastUpdated.toString() },
            'image': { S: item.image }
        }
    }

    try {
        await ddb.putItem(putParams).promise()
        return
    } catch (err) {
        return
    }
}

async function getFromDB(key) {
    const getParams = {
        TableName: 'WeatherTable',
        Key: {
            'cityName': { S: key }
        }
    }

    try {
        const data = await ddb.getItem(getParams).promise()
        const item = data.Item
        const itemObject = {}
        Object.keys(item).forEach((key) => {
            let itemValue = item[key]
            if (itemValue.N) itemObject[key] = parseFloat(itemValue.N)
            else if (itemValue.S) itemObject[key] = itemValue.S
            else if (itemValue.BOOL) itemObject[key] = itemValue.BOOL
        })
        return itemObject
    } catch (err) {
        return
    }
}