import { Route } from 'v-route-helper';

// Home
import HomePage from './components/HomePage';

// Settings
import SettingsLayout from './components/Settings';
import SettingsAccountPage from './components/settings/AccountPage';
import AccountBilling from './components/settings/account/Billing';
import SettingsNotificationPage from './components/settings/NotificationPage';

export default [
    Route('/', HomePage)
        .name('home')
        .meta({
            title   : 'Welcome Home',
            subTitle: '\\o/',
        }),

    Route('/settings', SettingsLayout).group(() => [
        Route('account', SettingsAccountPage)
            .meta('title', 'Account Settings')
            .name('account')
            .group(() => [
                Route('billing', AccountBilling)
                    .meta('title', 'Account Billing')
                    .name('billing'),
            ]),

        Route('notifications', SettingsNotificationPage)
            .meta('title', 'Notifications')
            .name('notifications'),
    ]).name('settings'),
]
