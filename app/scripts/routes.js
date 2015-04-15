'use strict';
/**
 * @ngdoc overview
 * @name tomTomApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes using `yo angularfire:route` with the optional --auth-required flag.
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['simpleLogin', function(simpleLogin) {
 *       return simpleLogin.getUser();
 *     }]
 *   }
 *
 */
angular.module('tomTomApp')

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'views/main.html',
//       controller: 'MainCtrl'
//     })

//     .when('/login', {
//       templateUrl: 'views/login.html',
//       controller: 'LoginCtrl'
//     })

//     .when('/chat', {
//       templateUrl: 'views/chat.html',
//       controller: 'ChatCtrl'
//     })

//     .whenAuthenticated('/account', {
//       templateUrl: 'views/account.html',
//       controller: 'AccountCtrl'
//     })

//     .when('/chat', {
//       templateUrl: 'views/chat.html',
//       controller: 'ChatCtrl'
//     })
//     .otherwise({redirectTo: '/'});
// }])

.config(function($urlRouterProvider) {

    // Prevent $urlRouter from automatically intercepting URL changes;
    // this allows you to configure custom behavior in between
    // location changes and route synchronization:
    $urlRouterProvider.deferIntercept();

})

.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('planning.dashboard');

    $stateProvider
        .state('projects', {
            url: '/projects',
            abstract: true,
            templateUrl: 'views/projects/index.html',
            controller: 'ProjectsCtrl'
        })
            .state('projects.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/projects/dashboard.html',
            })
            .state('projects.new', {
                url: '/new',
                templateUrl: 'views/projects/new.html',
            })

        .state('planning', {
            url: '/planning',
            abstract: true,
            templateUrl: 'views/planning/index.html'
        })
            .state('planning.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/planning/dashboard.html',
                controller: 'PlanningCtrl'
            })
            .state('planning.tickets', {
                url: '/tickets',
                templateUrl: 'views/planning/tickets.html',
                controller: 'PlanningTicketsCtrl'
            })
            .state('planning.ticket', {
                url: '/:id',
                templateUrl: 'views/planning/ticket.html',
                controller: 'PlanningTicketCtrl'
            })

        .state('assets', {
            url: '/assets',
            abstract: true,
            templateUrl: 'views/assets/index.html',
            controller: 'AssetsCtrl'
        })
            .state('assets.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/assets/dashboard.html'
            })
            .state('assets.create', {
                url: '/new',
                templateUrl: 'views/assets/create.html',
                controller: 'AssetsCreateCtrl'
            })
            .state('assets.asset', {
                url: '/:id',
                templateUrl: 'views/assets/asset.html',
                controller: 'AssetsAssetCtrl'
            })
            
        .state('people', {
            url: '/people',
            abstract: true,
            templateUrl: 'views/people/index.html',
            controller: 'PeopleCtrl'
        })
            .state('people.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/people/dashboard.html',
            })
            .state('people.companies', {
                url: '/companies',
                templateUrl: 'views/people/companies.html',
                controller: 'PeopleCompaniesCtrl',
            })
            .state('people.company', {
                url: '/companies/:id',
                templateUrl: 'views/people/company.html',
                controller: 'PeopleCompanyCtrl'
            })
            .state('people.people', {
                url: '/people',
                templateUrl: 'views/people/people.html',
            })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })

        .state('account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: 'AccountCtrl'
        });

})

/**
 * Apply some route security. Any route's resolve method can reject the promise with
 * { authRequired: true } to force a redirect. This method enforces that and also watches
 * for changes in auth status which might require us to navigate away from a path
 * that we can no longer view.
 */
// .run(['$rootScope', '$state', '$urlRouter', 'simpleLogin',
//     function($rootScope, $state, simpleLogin) {
//         // watch for login status changes and redirect if appropriate
//         simpleLogin.watch(check, $rootScope);

//         // some of our routes may reject resolve promises with the special {authRequired: true} error
//         // this redirects to the login page whenever that is encountered
//         $rootScope.$on('$urlRouterSuccess', function(e, next, prev, err) {
//             if (angular.isObject(err) && err.authRequired) {
//                 $state.go('login');
//             }
//         });

//         function check(user) {
//             if (!user) {
//                 $state.go('login');
//             }
//         }
//     }
// ])
.run(function($rootScope, $urlRouter, $state, simpleLogin) {

    $rootScope.$on('$locationChangeSuccess', function(e) {
        // UserService is an example service for managing user state

        if (!$state.is('login') && simpleLogin.user === null) {
            $state.go('login');
            return;
        }

        // Prevent $urlRouter's default handler from firing
        e.preventDefault();

        simpleLogin.login().then(function() {
            // Once the user has logged in, sync the current URL
            // to the router:
            $urlRouter.sync();
        });

        // // watch for login status changes and redirect if appropriate
        // simpleLogin.watch(check, $rootScope);

        // function check(user) {
        //     if (!user) {
        //         $state.go('login');
        //     }
        // }

    });

    // Configures $urlRouter's listener *after* your custom listener
    $urlRouter.listen();
});
