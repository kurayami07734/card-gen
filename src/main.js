import './app.css'
import App from './nav.svelte'
import app1 from './operation.svelte'
import img1 from './img.svelte'

const nav = new App({
  target: document.getElementById('nav'),
})

export default nav


const operation = new app1({
  target: document.getElementById('operation'),
})


const img = new img1({
  target: document.getElementById('img'),
})


