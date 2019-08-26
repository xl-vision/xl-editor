import { MDXProvider } from '@mdx-js/react'
import classnames from 'classnames'
import React from 'react'
import { Redirect, Route as ReactRoute } from 'react-router-dom'
import Spin from '../../../src/spin'
import routes, { ChildrenRoute, ComponentRoute, RedirectRoute, Route } from '../../routes'

import './index.scss'

const routeComponents: React.ReactNode[] = []

const addRoute = (routeArray: Route[], level = '1') => {
  routeArray.forEach((it, index) => {
    const key = `${level}_${index}`
    if ((it as ComponentRoute).component) {
      const componentRoute = it as ComponentRoute
      const loadable = React.lazy(() => componentRoute.component)
      routeComponents.push(
        <ReactRoute exact={true} key={key} path={componentRoute.path} component={loadable} />
      )
    } else if ((it as RedirectRoute).redirect) {
      const redirectRoute = it as RedirectRoute
      const component = () => <Redirect to={redirectRoute.redirect} /> // eslint-disable-line react/display-name
      routeComponents.push(
        <ReactRoute exact={true} key={key} path={redirectRoute.path} component={component} />
      )
    } else {
      const childrenRoute = it as ChildrenRoute
      addRoute(childrenRoute.children, key)
    }
  })
}

addRoute(routes)

const components = {
  a: (props: {}) => <a {...props} className='md_a' />,
  blockquote: (props: {}) => <blockquote {...props} className='md_blockquote' />,
  inlineCode: (props: {}) => <code {...props} className='md_code_inline' />,
  li: (props: {}) => <ol {...props} className='md_li' />,
  ol: (props: {}) => <ol {...props} className='md_ol' />,
  table: (props: {}) => (
    <div className='md_table-wrapper'>
      <table {...props} className='md_table' />
    </div>
  ),
  wrapper: (props: { children: React.ReactNode }) => (
    <div className={classnames('md')}>{props.children}</div>
  )
}

const Content: React.FunctionComponent<{}> = () => {
  return (
    <div className='content'>
      <MDXProvider components={components}>
        <React.Suspense fallback={<Spin cover={true} />}>{routeComponents}</React.Suspense>
      </MDXProvider>
    </div>
  )
}

export default Content
