---
title: The useUser-pattern with modern data-fetching libraries in React
date: "2021-05-19"
---

A common problem in client-side applications is keeping track of a users login state. This is generally something you need to access in many different parts of the application at many different levels of the component hierarchy...

`swr`, `react-query`, `apollo-client`

TODO: skriv mer

```JS
// useUser.js
const useUser = () => {
  const { data: user, mutate, error } = useRequest("/api/user")

  const loading = !user && !error

  return {
    loading,
    user,
    mutate,
  };
}

// Component
const Navbar = () => {
  const { user } = useUser()

  return (
    <div>
      {user ? (
        <>
          <UserDetails user={user} />
          <Logout> 
        </>
        ):(
        <Login>
        )}
    </div>
  )
}
```

```JS
const PleaseLogin = ({ children }) => {
  const { user } = useUser()

 if (!user) return <Login />

 return children
}
```

