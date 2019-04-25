# VRouteHelper

I really like how easy it is to specify routes in Laravel so I made this package to add that kind of syntax for vue-router.

**Any feedback would be greatfully appreciated.**

**Thank you for using my package :)**

## Table of Contents
- [Quick Example](#QuickExample)
- [Helpers](#Helpers)
- [Methods](#Methods)
  - [Name](#namename)
  - [Group](#groupcallback)
  - [Meta](#metavalue)
  - [Redirect](#redirectto)
  - [Alias](#aliasalias)
  - [BeforeEnter](#beforeentercallback)

## Quick Example
Here is a quick and simple example of how you can use this.
I've provided a simple & complete example in the examples folder in the repo if you'd like to have a look [here](https://github.com/73CN0109y-Packages/VRouteHelper/tree/master/example).
```js
// -------------
// |   app.js  |
// -------------
import Vue from 'vue';
import VueRouter from 'vue-router';
import VRouteHelper from 'v-route-helper';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter();

Vue.use(VRouteHelper, {
    router,
    routes,
});

const app = new Vue({
    router,
}).$mount('#app');

// -------------
// | routes.js |
// -------------
import { Route } from 'v-route-helper';

import WelcomePage from './views/Welcome';
import AuthLayout from './views/layouts/Auth';
import LoginPage from './views/auth/Login';
import RegisterPage from './views/auth/register';

export default [
    Route('', WelcomePage).name('welcome'),
    
    Route('/auth', AuthLayout).group(() => [
        Route('login', LoginPage).name('login'),
        Route('register', RegisterPage).name('register')
    ]).name('auth')
];
```

## Helpers
I've implemented a few functions that might help. Or not help... depends how you want to look at it.

### $resolveRouteName(name)
You can use this to lookup a route by it's name.

```js
// This will return the full route object
// Note: Simplified for... simplicity
// Returns: { name: 'settings.account', path: 'account', children: [...] }
this.$resolveRouteName('settings.account');

// This will return just the path
// Returns: account
this.$resolveRouteName('settings.account', 'path');

// This will return the full path
// Returns: /settings/account
this.$resolveRouteName('settings.account', 'fullpath');
```

### $findAllRoutes(criteria)
Pretty straight forward... This will simply return all routes.
You can also use a criteria to search for routes.

I can't remember why I implemented this but all I can hope for is that someone will find a use for it...

Note: You can't utilize the `fullpath` here. That only works for the above $resolveRouteName function. :(

```js
// Returns all routes
this.$findAllRoutes();

// Returns all routes that contains 'settings' in it's name, path, alias or redirect
this.$findAllRoutes('settings');

// You can also use an object if that's your kind of thing
this.$findAllRoutes({ name: 'settings' });
```

### $findRoute(criteria)
The same as $findAllRoutes but it just returns the first route that matches the criteria.

```js
// Returns the first route that contains 'account'
this.$findRoute('account');

// Just like above, you can use an object
this.$findRoute({ name: 'account' });
```

## Methods
After you specify a Route - `Route('/home', HomeComponent)` - you can chain any of these methods to define your route. You can chain all of these method even multiple times.

Full Example:
```js
Route('/', HomeComponent)
    .name('index')
    .meta('title', 'Home')
    .alias('/home')
    .meta('icon', 'fa-home');
```

#### name(name)
Specify a name for your route.
```js
Route('/home', HomeComponent).name('home');

// Output
{
    path: '/home',
    component: HomeComponent,
    name: 'home'
}
```

#### group(callback)
Group some routes together
```js
Route('/settings', SettingsComponent).group(() => [
    Route('account', SettingsAccount),
    Route('billing', SettingsBilling),
]);

// Output
{
    path: '/settings',
    component: SettingsComponent,
    children: [
        {
            path: 'account',
            component: SettingsAccount
        },
        {
            path: 'billing',
            component: SettingsBilling
        }
    ]
}
```

#### group(prefix, callback)
Group some routes together and get all of the routes a prefix
```js
Route(SettingsComponent).group('settings', () => [
    Route('account', SettingsAccount),
]);

// Output
{
    path: '',
    component: SettingsComponent,
    children: {
        {
            path: 'settings/account',
            component: SettingsAccount
        }
    }
}
```

#### meta(value)
Store some metadata on the route
```js
Route('/home', HomeComponent)
    .meta({
        title: 'Home',
        icon: 'fa-home'
    });

// Output
{
    path: '/home',
    component: HomeComponent,
    meta: {
        title: 'Home',
        icon: 'fa-home'
    }
}
```

#### meta(key, value)
Store some metadata on the route.

These can be chained multiple times and they will all get added to a meta object on the route.

**Note: If you use the previous meta function and specify an object, any of these calls before that will be discarded**
```js
Route('/home', HomeComponent)
    .meta('title', 'Home')
    .meta('icon', 'fa-home');

// Output
{
    path: '/home',
    component: HomeComponent,
    meta: {
        title: 'Home',
        icon: 'fa-home'
    }
}
```

```js
Route('/home', HomeComponent)
    .meta('title', 'Home')
    .meta({
        title: 'Not Home',
        icon: 'fa-bin'
    })
    .meta('icon', 'fa-home')
    
// Output
{
    path: '/home',
    component: HomeComponent,
    meta: {
        title: 'Not Home',
        icon: 'fa-home'
    }
}
```

#### redirect(to)
Specify a path this route should redirect to
```js
Route('/home', HomeComponent);
Route('/old_home', OldHomeComponent)
    .redirect('/home');

// Output
[{
    path: '/home',
    component: HomeComponent,
},
{
    path: '/old_home',
    component: OldHomeComponent,
    redirect: '/home'
}]
```

You can also specify the name of another route
```js
Route('/settings', SettingsComponent).group(() => [
    Route('account', SettingsAccount).name('account'),
]).name('settings');
Route('/old_settings', OldSettingsComponent)
    .redirect('settings.account');

// Output
[{
    path: '/settings',
    component: SettingsComponent,
    name: 'settings',
    children: [
        {
            path: 'account',
            component: SettingsAccount,
            name: 'settings.account',
        }
    ]
},
{
    path: '/old_settings',
    component: OldSettingsComponent,
    redirect: '/settings/account'
}]
```

#### alias(alias)
Specify an alias for the route
```js
Route('/home', HomeComponent)
    .alias('/old_home');

// Output
{
    path: '/home',
    component: HomeComponent,
    alias: '/old_home'
}
```

#### beforeEnter(callback)
Specify a callback that will be called before the route is entered
```js
Route('/user/:id', UserAccountComponent)
    .beforeEnter((to, from, next) => {
        console.log('user is viewing their account!');
        
        next();
    });

// Output
{
    path: '/user/:id',
    component: UserAccountComponent,
    beforeEnter(to, from, next) {
        console.log('user is viewing their account!');
        
        next();
    }
}
```
