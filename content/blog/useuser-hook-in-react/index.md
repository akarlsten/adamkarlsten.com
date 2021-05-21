---
title: The useUser-pattern with modern data-fetching libraries in React
date: "2021-05-19"
---

A common problem in client-side applications is keeping track of a users login state. This is generally something you need access to in many different parts of the application at many different levels of the component hierarchy. For example, it can be used to toggle a Navbar option between Login and Logout near the top level of your app, but also deep inside a form to determine which options are available.

Classically you would solve this with either a global state store such as Redux or with a React Context-based solution. With the advent of data-fetching libraries that maintain an internal cache such as `swr`, `react-query` or `apollo-client` there is a dead simple way to solve this, and it goes something like this:

```JS
// useUser.js
const useUser = () => {
  const { data: user, mutate, error } = useSWR("/api/user")

  const loading = !user && !error

  return {
    user,
    isLoading,
    mutate
  }
}

export default useUser
```

It can then be used like in this example:

```JS
// Component
const Navbar = () => {
  const { user } = useUser()

  return (
    <div>
      {user && (
        <>
          <UserDetails user={user} />
          <Logout> 
        </>
        )}
      {!user && (
        <Login>
        )}
    </div>
  )
}
```
#### How it works

First you define a hook that encapsulates the user fetching using your chosen data-fetching library. `swr` is used in the example, but they generally have similar APIs using a hook that takes a `key` and a `fetcher` as arguments (in this example we have already globally configured a `fetcher`). It then returns an object containing the request details which is generally destructured like shown. As these libraries use hooks under the hood, they are updated automatically in real-time according to the status of the request.

You may be wondering what makes this different from creating a similar component that just uses the built-in `fetch`, and there are a few things, but the key part is that all these newer libraries maintain an internal cache of previous request's data. Whenever a component mounts that uses a `useSWR` hook, `swr` first automatically consults the cache for a previous request with the same `key`. If it finds one it immediately returns that data before starting a so called revalidation and fetching from our backend. This behavior can usually be customized in a lot of ways (conditional fetching, cache-only fetching, etc.), but for our purposes the standard behavior is fine. These libraries also have ways to deduplicate and share requests, so that 5 components using our `useUser` on the same page only causes 1 revalidation request (as they share the same `key`).

#### Neat Tricks

So far this is very basic and part of most of these libraries documentation, but our `useUser` hook can also be used together with wrapper components to let us abstract things further. Credits to [Wes Bos](https://twitter.com/wesbos) from who I first learned about these:

```JS
// Next.js example

// components/PleaseLogin.js
const PleaseLogin = ({ children }) => {
  const { user } = useUser()

  if (!user) return <Login />

  return children
}

// pages/protected.js
const Protected = () => {
  return (
    <Page>
      <PleaseLogin>
        <ProtectedComponent />
      </PleaseLogin>
    </Page>
  )
}
```

This component allows you to wrap authenticated routes in your application, if a user is logged in the requested route is shown, if not the Login form component is shown instead.

It also gracefully handles the user actually logging in. As your browser will still be at the same URI (`/protected`), as soon as the revalidation goes through the Login form is replaced by the correct component(s).

```JS
const Authed = ({ children }) => {
  const { user } = useUser()

  if (!user) return null

  return children
}

// Elsewhere
const Buttons = () => (
  <>
    <PublicButton />
    <Authed>
      <ProtectedButton />
    </Authed>
  </>
)
```

Same principle here, except this one prevents its children from rendering when a user isn't logged in. More useful in cases where you just want to hide specific UI elements from logged out users rather than "redirect" them to a Login form. The same result can of course be achieved by importing `useUser` into your component directly and using `{user && <ProtectedButton>}` as in the original example. It's personal preference, really. 
