import 'reflect-metadata'
import { connect } from './config/typeorm'
import { startServer } from './server'

(async () => {
    try {
        await connect()
        const app = await startServer()
        app?.listen(app.get('port'))
        console.log(`Server on port ${app?.get('port')}`)    
    } catch (e) {
        console.log(e)
    }
})()