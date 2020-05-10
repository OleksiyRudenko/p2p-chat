# Rant

A distributed p2p chat.

## Development

- `yarn` to install the dependencies
- `yarn run dev` to start [Rollup](https://rollupjs.org) backed dev server
- Navigate to [localhost:5000](http://localhost:5000) to see your app up and running

Edit a component file in `src`, save it.

By default, the server will only respond to requests from localhost.
To allow connections from other computers, edit the `sirv` commands in package.json
to include the option `--host 0.0.0.0`.

## Building and running in production mode

`yarn run build` To create an optimised version of the app

`yarn run start` to run the newly built app.
This uses [sirv](https://github.com/lukeed/sirv),
which is included in your package.json's `dependencies` so that the app
will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, `sirv` will only respond to requests that match files in `public`.
This is to maximise compatibility with static fileservers,
allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes,
sirv needs to be able to respond to requests for *any* path.
You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploying to the web

### With `now`

Have an account on [now](https://zeit.co/now)

- `yarn global add now` to install `now` if you haven't already
- `cd public && now deploy --name my-project` to deploy

As an alternative, use the [Now desktop client](https://zeit.co/download)
and simply drag the unzipped project folder to the taskbar icon.

### With `surge`

Have an account with [surge](https://surge.sh/).

- `yarn global add surge` to install `surge` if you haven't already
- `yarn run build && surge public my-project.surge.sh` to deploy

## Data model

### Server

[Based on reddit post](https://www.reddit.com/r/firestore/comments/erv69v/chat_in_one_document_not_a_good_idea/)

Latest posts are stored under `posts/`.

Posts can be organized by `room` (`uk` | `en` | `de` | `ru` etc ) property.

Every X minutes a cloud function:
1. checks number of free floating posts per room (`n`)
2. if `n` exceeds 50 then
   - create document `archivedPosts/{room}-{timestamp}`
   - move posts and their `reactions` and `abuseReports`
     to the maps of the archived doc
   - no new reactions or abuseReports should be accepted to
     an archived doc

### Client

[Should use firestore persistence](https://firebase.google.com/docs/firestore/manage-data/enable-offline#web)

In the context of a room:
1. LocalStore Service:
   - Reads free floating posts and their reactions and the latest archive
     and stores in the localStorage
   - When requested for older reads them from archives and adds to the localStorage
   - When newer posts arrive stores them in the localStorage
   - employs firestore persistence
2. App queries LocalStore

## Credits

- [vnglst/svelte-gundb-chat @ GitHub](https://github.com/vnglst/svelte-gundb-chat)
- firebase backed early implementation [OleksiyRudenko/[private]rant-firebase @ GitHub](https://github.com/OleksiyRudenko/rant-firebase)
