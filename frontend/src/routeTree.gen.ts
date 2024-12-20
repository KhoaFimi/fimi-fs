/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'
import { Route as AuthenticatedAdminImport } from './routes/_authenticated/_admin'
import { Route as AuthResetPasswordIndexImport } from './routes/auth/reset-password/index'
import { Route as AuthRegisterIndexImport } from './routes/auth/register/index'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as AuthInviteIndexImport } from './routes/auth/invite/index'
import { Route as AuthForgotPasswordIndexImport } from './routes/auth/forgot-password/index'
import { Route as AuthEmailVerificationIndexImport } from './routes/auth/email-verification/index'
import { Route as AuthenticatedAdminAdminIndexImport } from './routes/_authenticated/_admin/admin/index'
import { Route as AuthenticatedAdminAdminPublishersIndexImport } from './routes/_authenticated/_admin/admin/publishers/index'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAdminRoute = AuthenticatedAdminImport.update({
  id: '/_admin',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthResetPasswordIndexRoute = AuthResetPasswordIndexImport.update({
  id: '/reset-password/',
  path: '/reset-password/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRegisterIndexRoute = AuthRegisterIndexImport.update({
  id: '/register/',
  path: '/register/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthInviteIndexRoute = AuthInviteIndexImport.update({
  id: '/invite/',
  path: '/invite/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordIndexRoute = AuthForgotPasswordIndexImport.update({
  id: '/forgot-password/',
  path: '/forgot-password/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthEmailVerificationIndexRoute = AuthEmailVerificationIndexImport.update(
  {
    id: '/email-verification/',
    path: '/email-verification/',
    getParentRoute: () => AuthRoute,
  } as any,
)

const AuthenticatedAdminAdminIndexRoute =
  AuthenticatedAdminAdminIndexImport.update({
    id: '/admin/',
    path: '/admin/',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

const AuthenticatedAdminAdminPublishersIndexRoute =
  AuthenticatedAdminAdminPublishersIndexImport.update({
    id: '/admin/publishers/',
    path: '/admin/publishers/',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_admin': {
      id: '/_authenticated/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedAdminImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/auth/email-verification/': {
      id: '/auth/email-verification/'
      path: '/email-verification'
      fullPath: '/auth/email-verification'
      preLoaderRoute: typeof AuthEmailVerificationIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/forgot-password/': {
      id: '/auth/forgot-password/'
      path: '/forgot-password'
      fullPath: '/auth/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/invite/': {
      id: '/auth/invite/'
      path: '/invite'
      fullPath: '/auth/invite'
      preLoaderRoute: typeof AuthInviteIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/login/': {
      id: '/auth/login/'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/register/': {
      id: '/auth/register/'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterIndexImport
      parentRoute: typeof AuthImport
    }
    '/auth/reset-password/': {
      id: '/auth/reset-password/'
      path: '/reset-password'
      fullPath: '/auth/reset-password'
      preLoaderRoute: typeof AuthResetPasswordIndexImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/_admin/admin/': {
      id: '/_authenticated/_admin/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AuthenticatedAdminAdminIndexImport
      parentRoute: typeof AuthenticatedAdminImport
    }
    '/_authenticated/_admin/admin/publishers/': {
      id: '/_authenticated/_admin/admin/publishers/'
      path: '/admin/publishers'
      fullPath: '/admin/publishers'
      preLoaderRoute: typeof AuthenticatedAdminAdminPublishersIndexImport
      parentRoute: typeof AuthenticatedAdminImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedAdminRouteChildren {
  AuthenticatedAdminAdminIndexRoute: typeof AuthenticatedAdminAdminIndexRoute
  AuthenticatedAdminAdminPublishersIndexRoute: typeof AuthenticatedAdminAdminPublishersIndexRoute
}

const AuthenticatedAdminRouteChildren: AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminAdminIndexRoute: AuthenticatedAdminAdminIndexRoute,
  AuthenticatedAdminAdminPublishersIndexRoute:
    AuthenticatedAdminAdminPublishersIndexRoute,
}

const AuthenticatedAdminRouteWithChildren =
  AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedAdminRoute: typeof AuthenticatedAdminRouteWithChildren
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren,
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface AuthRouteChildren {
  AuthEmailVerificationIndexRoute: typeof AuthEmailVerificationIndexRoute
  AuthForgotPasswordIndexRoute: typeof AuthForgotPasswordIndexRoute
  AuthInviteIndexRoute: typeof AuthInviteIndexRoute
  AuthLoginIndexRoute: typeof AuthLoginIndexRoute
  AuthRegisterIndexRoute: typeof AuthRegisterIndexRoute
  AuthResetPasswordIndexRoute: typeof AuthResetPasswordIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthEmailVerificationIndexRoute: AuthEmailVerificationIndexRoute,
  AuthForgotPasswordIndexRoute: AuthForgotPasswordIndexRoute,
  AuthInviteIndexRoute: AuthInviteIndexRoute,
  AuthLoginIndexRoute: AuthLoginIndexRoute,
  AuthRegisterIndexRoute: AuthRegisterIndexRoute,
  AuthResetPasswordIndexRoute: AuthResetPasswordIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedAdminRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/auth/email-verification': typeof AuthEmailVerificationIndexRoute
  '/auth/forgot-password': typeof AuthForgotPasswordIndexRoute
  '/auth/invite': typeof AuthInviteIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/register': typeof AuthRegisterIndexRoute
  '/auth/reset-password': typeof AuthResetPasswordIndexRoute
  '/admin': typeof AuthenticatedAdminAdminIndexRoute
  '/admin/publishers': typeof AuthenticatedAdminAdminPublishersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedAdminRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/auth/email-verification': typeof AuthEmailVerificationIndexRoute
  '/auth/forgot-password': typeof AuthForgotPasswordIndexRoute
  '/auth/invite': typeof AuthInviteIndexRoute
  '/auth/login': typeof AuthLoginIndexRoute
  '/auth/register': typeof AuthRegisterIndexRoute
  '/auth/reset-password': typeof AuthResetPasswordIndexRoute
  '/admin': typeof AuthenticatedAdminAdminIndexRoute
  '/admin/publishers': typeof AuthenticatedAdminAdminPublishersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/_authenticated/_admin': typeof AuthenticatedAdminRouteWithChildren
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/auth/email-verification/': typeof AuthEmailVerificationIndexRoute
  '/auth/forgot-password/': typeof AuthForgotPasswordIndexRoute
  '/auth/invite/': typeof AuthInviteIndexRoute
  '/auth/login/': typeof AuthLoginIndexRoute
  '/auth/register/': typeof AuthRegisterIndexRoute
  '/auth/reset-password/': typeof AuthResetPasswordIndexRoute
  '/_authenticated/_admin/admin/': typeof AuthenticatedAdminAdminIndexRoute
  '/_authenticated/_admin/admin/publishers/': typeof AuthenticatedAdminAdminPublishersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/auth'
    | '/dashboard'
    | '/auth/email-verification'
    | '/auth/forgot-password'
    | '/auth/invite'
    | '/auth/login'
    | '/auth/register'
    | '/auth/reset-password'
    | '/admin'
    | '/admin/publishers'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/auth'
    | '/dashboard'
    | '/auth/email-verification'
    | '/auth/forgot-password'
    | '/auth/invite'
    | '/auth/login'
    | '/auth/register'
    | '/auth/reset-password'
    | '/admin'
    | '/admin/publishers'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/auth'
    | '/_authenticated/_admin'
    | '/_authenticated/dashboard'
    | '/auth/email-verification/'
    | '/auth/forgot-password/'
    | '/auth/invite/'
    | '/auth/login/'
    | '/auth/register/'
    | '/auth/reset-password/'
    | '/_authenticated/_admin/admin/'
    | '/_authenticated/_admin/admin/publishers/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_admin",
        "/_authenticated/dashboard"
      ]
    },
    "/auth": {
      "filePath": "auth.tsx",
      "children": [
        "/auth/email-verification/",
        "/auth/forgot-password/",
        "/auth/invite/",
        "/auth/login/",
        "/auth/register/",
        "/auth/reset-password/"
      ]
    },
    "/_authenticated/_admin": {
      "filePath": "_authenticated/_admin.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_admin/admin/",
        "/_authenticated/_admin/admin/publishers/"
      ]
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/auth/email-verification/": {
      "filePath": "auth/email-verification/index.tsx",
      "parent": "/auth"
    },
    "/auth/forgot-password/": {
      "filePath": "auth/forgot-password/index.tsx",
      "parent": "/auth"
    },
    "/auth/invite/": {
      "filePath": "auth/invite/index.tsx",
      "parent": "/auth"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.tsx",
      "parent": "/auth"
    },
    "/auth/register/": {
      "filePath": "auth/register/index.tsx",
      "parent": "/auth"
    },
    "/auth/reset-password/": {
      "filePath": "auth/reset-password/index.tsx",
      "parent": "/auth"
    },
    "/_authenticated/_admin/admin/": {
      "filePath": "_authenticated/_admin/admin/index.tsx",
      "parent": "/_authenticated/_admin"
    },
    "/_authenticated/_admin/admin/publishers/": {
      "filePath": "_authenticated/_admin/admin/publishers/index.ts",
      "parent": "/_authenticated/_admin"
    }
  }
}
ROUTE_MANIFEST_END */
