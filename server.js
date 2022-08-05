import * as Puppeteer from 'puppeteer'
import Express from 'express'
import Mongoose from 'mongoose'
import bodyParser from 'body-parser'

const server = new Express

console.log('Start')

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
})

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running')
})

server.get('/directoryinfo/:collection', (req, res, next) => {
    let methodReturn = directoryInfo(req.params.collection)
    res.json(methodReturn)
})

const directoryInfo = async (collectionID) => {

    console.log('Run Function')

    let sourceURL = `https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=${collectionID}`

    let browser = await Puppeteer.launch()
    let page = await browser.newPage()

    await page.goto(sourceURL)
    await page.waitForSelector('#methods > li')

    let canisterInterface = await page.evaluate(()=>{
        let methodList = Array.from(document.querySelectorAll('#methods > li'))

        return Promise.all( methodList.map(async (item)=>{
            return item.id
        }))
    })
    await browser.close()
    // console.log(canisterInterface)
    return (canisterInterface)
}

