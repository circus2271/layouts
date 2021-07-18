import '../styles/style.scss'
import './includes/_lazyloading'
import delay from './includes/delay.ts'

(async () => {
    await delay(3000)
    console.log('Hello world')
})()
