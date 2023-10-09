import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue")
    },
    {
        path: "/MovieDetail/:id",
        name: "Movie Detail",
        component: () => import("@/views/MovieDetail.vue")
        
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: () => import("@/views/Favorites.vue")
        
    },
   
    
   
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;