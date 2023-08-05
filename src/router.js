
import AppDashboard from './views/AppDashboard.vue'
import AppProjects from './views/AppProjects.vue'
import AppTeam from './views/AppTeam.vue'
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: AppDashboard
    },
    {
        path: '/projects',
        name: 'projects',
        component: AppProjects
    },
    {
        path: '/team',
        name: 'team',
        component: AppTeam
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;