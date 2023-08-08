import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port: number = 8080

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there')
    console.log('Home page reload')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
