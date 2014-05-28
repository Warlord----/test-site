/**
 * Created by Aliaksandr_Padabed on 4/24/2014.
 */
var app = angular.module('app', []);

app.controller('appController', function($scope) {

    $scope.toggleBlock = function(id) {
        setTimeout(function() {
            $scope.$emit('toggleBlock', id);
        }, 0);
    };

});

app.directive('iButton', function() {
    return {
        restrict: 'A',
        link: function($scope, el, attrs) {
            var identity = el.attr('id');
            identity = identity.replace('-btn', '');
            var container = $('#' + identity);

            $scope.$on('toggleBlock', function(event, id) {

                if(id != identity) {
                    if (!container.hasClass('hidden')) {
                        el.removeClass('active');
                        container.addClass('hidden');
                    }
                } else {
                    if (container.hasClass('hidden')) {
                        el.addClass('active');
                        container.removeClass('hidden');
                    }
                    else {
                        el.removeClass('active');
                        container.addClass('hidden');
                    }
                }
            });

        }
    };
});

app.directive('iMain', function() {
    return {
        restrict: 'A',
        link: function($scope, el, attrs) {
            $scope.$on('toggleBlock', function(event, id) {
                setTimeout(function() {
                    if(id == "main-menu" && $('#main-menu-btn').hasClass('active')) {
                        el.css({
                            paddingTop: '230px'
                        });
                    } else {
                        el.css({
                            paddingTop: '0'
                        });
                    }
                }, 0);
            });

        }
    };
});

app.directive('iMainMenu', function($window) {
    return {
        restrict: 'A',
        link: function($scope, el, attrs) {
            var window = angular.element($window);
            window.scroll(function() {
                if($('#main-menu-btn').hasClass('active'))
                    $scope.$emit('toggleBlock', 'main-menu');
            });

        }
    };
});

app.directive('scrollFix', function($window) {
    return {
        restrict: 'A',
        link: function($scope, el, attrs) {
            var window = angular.element($window);

            var getTopOffset = function() {
                var width = $window.innerWidth;
                if(width >= 768) {
                    return "85";
                }
                else return "50"
            };

            window.scroll(function() {
                var offsetTop = getTopOffset();
                var scrollTop = window.scrollTop();
                if (scrollTop > offsetTop) {
                    el.css({
                        top: 0
                    });
                    el.addClass('scrolled');
                } else {
                    el.css({
                        top: getTopOffset() + "px"
                    });
                    el.removeClass('scrolled');
                }
            });

            window.resize(function() {
               window.scroll();
            });
        }
    };
});