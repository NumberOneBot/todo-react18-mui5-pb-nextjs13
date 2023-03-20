# Todo App

This project is one more solution to a well-known [Backpack Problem](https://brilliant.org/wiki/backpack-problem/). The initial app sketches resembled a lot like a simple [mobile app](https://github.com/NumberOneBot/todo-react18-mui5-pb-nextjs13/blob/master/assets/markup.png?raw=true), so I decided to give a try to Material UI v5 library, which I wasn't familiar with, despite its huge popularity. Creating markup by hand or using good ol' Bootstrap would definitelly be much faster, but I wanted to take a chance and play around, experiment with the MUI. This decision had a big impact on the overall architecture, and I'm not quite happy with the final result. I'll discuss this more later.

My plan consisted of several steps:

-   Study `MaterialUI` general structure and components
-   Code the app logic and screen/view dependencies as a common React app with routes
-   Get familiar with the `PocketBase` and connect it as a replacement for React's context provider with data caching
-   Convert everything to `NextJS`, looking into the new `app` structure implemented in v13

### #1

Going deep into MUI things hooked me for another two days: regular web interfaces depend on the full page rendering, including header/footer and so on, while the mobile apps mostly have the tabs/bottom bar as the main switcher of the views - it should appear first and be the main router, loading content inside the screen. The native iOS API also assumes content switching within a single/shared top bar, but this time I decided to duplicate it inside the main layouts, so as not to deal with switching titles and buttons. Dialog windows are also appearing on top of both views (by design), so they are also rendered on the top level. It is the same, mobile-first approach, widely popular in the native apps, but not so on the web. Routing part is split by page/view basis and the sorting mode switcher does its part inside the Today's view. Many people prefer to organize all the routing in one place, but such split also comes from the mobile world and have its own benefits, like the ability to use the same component in different routes. _I also wanted to have a separate routes for the dialog windows, so that they can be opened from the URL, but this is not implemented yet._

Dealing with form components became the most annoying and time-consuming part, as they all are controlled by MUI + have a lot of wrapping without exposing the native inputs. The first dirty version of form validation with a bunch of states and hand-written logic was actually ~20% smaller than connection of `react-form-hook` and use of its `Controller` component, which rerenders each field completely.

### #2

The most fun was the Backpack algorithm + additional logic to deal with locked items. Everything becomes clear once you realise that the batch could be filled in one array iteration, if it was previously sorted with the right rules. This even includes picking of the locked items, if their dependencies are also included in the batch or already present in the pending list.

_(Clicking the locked item highlights its blockers. I came out with this solution to do not add more mess in layout and DOM tree.)_

### #3

The third part of the app was the data storage. I've heard about `PocketBase` a few times, but never had a chance to try it. Switching to it was pretty easy and straightforward. First implementation used built-in React context provider + `localStorage` and aggregated all the methods to alter the data, updating array as a whole. This has become handy for updating the `react-query` cache and using it as the main storage, while updating only altered entries in the database.

An irritating discovery was the lack of the `updateMany` method in PocketBase API, so I had to write a custom one using `Promise.all`. Exposing of each mutation's loading and error states from my context provider also made it a bit overflown. It works for now, but I would consider splitting it by every mutation as many people do with `react-query`.

I intentionally skipped the whole authorization part and just connect into the PB as an admin. Definitelly not a good practice, but I didn't want to spend time on this.

Nice (and obvious) addition to the interface was "Remove completed" button, which completes all the tasks life cycle and removes them from the database.

### #4

And here comes an elephant in the room. 🐘

It appears MUI V5 is simply not ready yet for the new architecture of NextJS V13 with the dynamic use of server and client components together. No stateful component could be rendered on the server side (for obvious reasons), but most of the MUI ones have something stated/stored internally. It comes down even to the smallest things, like `BottomNavigationAction` with the `Link` to some page. CSS-caching / class-generation of `emotion/styled`, `emotion/react` libraries is also not ported to the server-side rendering yet _(and I heavily used inline CSS-in-JS styles, because, well, everybody does so in MUI)_.

(https://github.com/mui/material-ui/issues/34898)
(https://github.com/mui/material-ui/issues/34905)
(https://github.com/mui/material-ui/issues/34896)

So, the only way to make it work without tons of hacks and workarounds was to switch to client-side rendering from the very beginning (`"use client";`). The entire application is no longer a NextJS app, but a simple React app, using NextJS solely as a thin server layer with some routing support. This also means that even database connections are made on the client-side, which is not a good practice at all. I can try to use NextJS `rewrites` or `redirects` to proxy all API requests from the client and hide the authentication part, but this isn't a good solution either.

One more hacky approach had to be used even in the smallest part, like `.env.local`, since NextJS doesn't expose its context to the client-side code without `NEXT_PUBLIC_` prefixes.

## Installation

```

npm install

pb/pocketbase serve

react-scripts start

```
