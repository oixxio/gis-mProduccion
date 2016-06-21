(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', [ '$scope', '$rootScope', '$route', '$document', AppCtrl]); // overall control

    
    function AppCtrl($scope, $rootScope, $route, $document) {

        var date = new Date();
        var year = date.getFullYear();

        $scope.main = {
            brand: 'MI',
            name: 'Admin',
            year: year
        };

        $scope.pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];

        $scope.admin = {
            layout: 'wide',                                 // 'boxed', 'wide'
            menu: 'horizontal',                               // 'horizontal', 'vertical', 'collapsed'
            fixedHeader: true,                              // true, false
            fixedSidebar: false,                             // true, false
            pageTransition: $scope.pageTransitionOpts[0],   // unlimited
            skin: '22'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        };

        $scope.$watch('admin', function(newVal, oldVal) {
            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
                $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
                if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                    $scope.admin.fixedHeader = true;
                    $scope.admin.fixedSidebar = true;
                }
                if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                    $scope.admin.fixedHeader = false;
                    $scope.admin.fixedSidebar = false;
                }
            }
            if (newVal.fixedSidebar === true) {
                $scope.admin.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
                $scope.admin.fixedSidebar = false;
            }
        }, true);

        $scope.color = {
            primary:        '#5B90BF',
            success:        '#A3BE8C',
            info:           '#7FABD2',
            infoAlt:        '#B48EAD',
            warning:        '#EBCB8B',
            danger:         '#BF616A',
            gray:           '#DCDCDC'
        };

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });
    }

})(); 