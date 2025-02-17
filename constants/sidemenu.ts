import { useProfileStore } from "@/app/stores/useProfileStore"

const profile = useProfileStore()
async function getProfile() {
  await profile.getMyProfile()
}
getProfile()

type TMenuL3 = {
  roles?:string[]
  label:string
  path: string
  icon?: string
  level?: number
}
type TMenuL2 = {
  roles?: string[]
  label: string
  path: string
  icon?: string
  level?: number
  children?: TMenuL3[]
}
type TMenuL1 = {
  roles?: string[]
  label: string
  path: string
  icon?: string
  level?: number
  children?: TMenuL2[]
}
type TMenu = {
  roles?: string[]
  header: string
  children: TMenuL1[]
}

export const menusx: TMenu[] = [
  {
    header: "home",
    roles:["ADMIN","SUPER"],
    children: [
      {
        roles: ["ADMIN", "SUPER"],
        label:"Dashboard",
        path: "/admin",
        icon: 'ph:speedometer',
        level: 1
      }
    ]
  },
  {
    roles: ["SUPER"],
    header: "master",
    children: [
      {
        label: "Users",
        path: "/admin/users",
        icon: 'ph:users',
        level: 1,
      },
      {
        label: "Blog Category",
        path: "/admin/blog-category",
        icon: 'material-symbols:newsmode-outline-rounded',
        level: 1,
      },
    ]
  },
  {
    header: "management",
    roles: ["SUPER","ADMIN"],
    children: [
      {
        roles: ["SUPER","ADMIN"],
        label: "Products",
        path: "/admin/products",
        icon: 'solar:clipboard-list-broken',
        level: 1,
      },
      {
        roles: ["SUPER","ADMIN"],
        label: "Blogs",
        path: "/admin/blogs",
        icon: 'entypo:news',
        level: 1,
      },
    ]
  },
  {
    header: "setting",
    roles: ["SUPER"],
    children: [
      {
        roles: ["SUPER"],
        label: "Utility",
        path: "/admin/utility",
        icon: 'mingcute:settings-2-line',
        level: 1,
      }
    ]
  }
];

export const menus: TMenu[] = menusx.filter(item => item.roles?.includes(profile.profile.role))