# VRouteHelper

I really like how easy it is to specify routes in Laravel so I made this package to add that kind of syntax for vue-router.

I've tried to support everything that vue-router normally has (although I may have missed out on some things).

There is an example in the examples folder.

**Note: This is still under development**

## Table of Contents
- [Basic](#Basics)
- [Methods](#Methods)
  - [Name](#namename)
  - [Group](#groupcallback)
  - [Meta](#metavalue)
  - [Redirect](#redirectto)
  - [Alias](#aliasalias)
  - [BeforeEnter](#beforeentercallback)

## Basics
Here is a basic example of how this works.
```js
// Instead of your route being this;
{
    path: '/home',
    component: HomeComponent,
    name: 'home'
}

// You can do it like this;
Route('/home', HomeComponent).name('home')
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
            path: 'account',
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
