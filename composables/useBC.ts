export const useBC = () => {
  const route = useRoute();
  const breadcrumbs: any = ref(null);
  const titlePage: any = ref();
  const title = ref<string>('')
  watch(
    () => ({
      fullpath: route.fullPath,
      path: route.path,
      name: route.name,
      meta: route.meta,
      matched: route.matched,
    }),
    (route) => {
      const routeAll = route.fullpath.split("/");
      const routes = routeAll.filter((i) => i !== "");
      const fixRoute = routes?.map((item) => {
        return {
          name: item.split("-").join(" ").split("?").shift(),
          path: item,
        };
      });
      breadcrumbs.value = fixRoute;
      titlePage.value = routes.shift();
      // title.value = routes.pop()?.split('?').shift()?.split("-").join(' ') || '';
      title.value = routes.shift()?.split('?').shift()?.split("-").join(' ') || ''
    },
    {
      immediate: true,
    },
  );
  return {
    titlePage,
    breadcrumbs,
    title
  };
};