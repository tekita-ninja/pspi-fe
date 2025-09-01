export default defineNuxtRouteMiddleware((to, from) => {
  const isAdminPage = to.path.includes('/admin')
  const isLoginPage = to.path.includes('/login')
  const isLoggedIn = useCookie("access_token");

  if (isAdminPage) {
    if (!isLoggedIn.value) {
      return navigateTo('/login')
    }
  }
  if (isLoginPage) {
    if (isLoggedIn.value) {
      return navigateTo('/admin')
    }
  }
})