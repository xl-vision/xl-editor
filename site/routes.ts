export interface ChildrenRoute {
  children: Route[]
  name: string
}

export interface RedirectRoute {
  path: string
  redirect: string
}

export interface ComponentRoute {
  component: Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string
  path: string
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

// tslint:disable
const routes: Route[] = [
  {
    path: '/',
    redirect: '/editor'
  },
  {
    name: '编辑器',
    path: '/editor',
    component: import('../src/__doc__/index.mdx')
  }
]

export default routes
