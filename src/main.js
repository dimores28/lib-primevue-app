import { createApp } from 'vue'
import App from './App.vue'
import 'requests_component_library/dist/index.css';
// import { TestComponent, PrimeVueWpapper } from 'requests_component_library';



const app = createApp(App);

// app.component('PrimeVueWpapper', PrimeVueWpapper);
// app.component('TestComponent', TestComponent);

app.mount('#app')
