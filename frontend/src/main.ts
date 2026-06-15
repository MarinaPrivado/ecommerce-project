import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import KeyFilter from 'primevue/keyfilter';
import AnimateOnScroll from 'primevue/animateonscroll';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
            darkModeSelector: '.my-app-dark',
        }
  },
})

app.directive('keyfilter', KeyFilter);
app.directive('animateonscroll', AnimateOnScroll);

app.use(router)

app.mount('#app')