/**
 * 存储的是,角色对应的权限名称
 */
const roleToRoute = {
    coustomer: [{ name: 'Product' }, { name: 'ProductList' }, { name: 'ProductAdd' }],
    admin: [{ name: 'Product' }, { name: 'ProductList' }, { name: 'ProductAdd' }, { name: 'Catrgory' }]
}
export default function getMenuRoute(role, routes) {
    const allowRouteName = roleToRoute[role].map((item) => { return item.name }) // 数组
    const resultRoutes = routes.filter(r => {
        if (allowRouteName.indexOf(r.name) !== -1) {
            r.children = r.children.filter(citem => {
                return allowRouteName.indexOf(citem.name) !== -1
            })
            return true
        }
        return false
    })
    return resultRoutes
}