import Puppeteer from 'puppeteer'
import Express from 'express'
import Mongoose from 'mongoose'
import bodyParser from 'body-parser'


// const Express = require('express')
// const Mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// const Puppeteer = require('puppeteer');

const updateDirectoryInfo = (x, y) =>{

    (async () => {
        console.log('\n----- AI Faces API: -----\n')
    
        let sourceURL = 'https://generated.photos/faces/beautified/adult/joy/male'
    
        let browser = await Puppeteer.launch()
        let page = await browser.newPage()
    
        await page.goto(sourceURL)
    
        // const clickingAction = await page.evaluate()
        
    
        let tvRes = await page.evaluate(()=>{
    
            // page.click('[class="loadmore"]')
    
            let tvEntry = Array.from(document.querySelectorAll('div.card-image'))
            // tvTemp = []
    
            return Promise.all( tvEntry.map(async (item) =>{
                let tvPrice = await item.querySelector('img').src
                let itemPush = tvPrice
                return itemPush
            }))
            // return tvTemp
        })
    
        await browser.close()
    
        console.log(tvRes)
    })()

}
