import AWS from 'aws-sdk'
// Create a DynamoDB document client
const documentClient = new AWS.DynamoDB()

export const DBService = {
    putInDB,
    getFromDB
}

async function putInDB(keyName, value) {
    const key = {
        id: { S: keyName }
    }

    const params = {
        TableName: 'locations_table',
        Item: { ...key, ...value }
    }

    try {
        const data = await documentClient.putItem(params).promise()
        console.log(data)
    } catch (err) {
        console.error(err)
        throw err
    }

}

async function getFromDB(keyName) {
    const key = {
        id: { S: keyName }
    }

    const params = {
        TableName: 'locations_table',
        Key: key
    }

    try {
        const data = await documentClient.getItem(params).promise()
        console.log(data)
    } catch (err) {
        console.error(err)
        throw err
    }
}
