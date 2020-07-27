const routers = [{
  path: '/',
  exact: true,
  component: '@/pages/home/home',
}];
const layoutRoutes = {
  routes: [
    {
      path: '/', component: '@/layouts/index',
      routes: routers,
    }
  ],
};
export default layoutRoutes;