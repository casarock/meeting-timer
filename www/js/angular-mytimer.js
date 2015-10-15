var mytimerModule = angular.module('mytimer', [])
    .directive('mytimer', ['$compile', function ($compile) {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                autoStart: '&autostart',
                time: "=?",
                seconds: '=?',
                minutes: '=?',
                hours: '=?',
                meetingCosts: '=?',
                timerColor: '=?',
                max: '='
            },
            controller: ['$scope', '$timeout', '$element', '$attrs', function($scope, $timeout, $element, $attrs) {
                var timer = null;
                reset();
                console.log($scope.max);
                $scope.autoStart = $attrs.autoStart || $attrs.autostart;
                $element.append($compile($element.contents())($scope));
                $scope.timerColor = 'color: black;';

                $scope.stopCounter = $element[0].stopCounter = function() {
                    $timeout.cancel(timer);
                    timer = null;
                    $scope.isRunning = false;
                };

                $scope.startCounter = $element[0].startCounter = function(costPerMinute) {
                    if (timer === null && $scope.isRunning === false) {
                        reset();
                        $scope.costPerMinute = costPerMinute || 0;
                        $scope.startTime = Date.now();
                        updateCounter();
                        $scope.isRunning = true;
                    }
                };

                $scope.getCurrentTime = $element[0].getCurrentTime = function() {
                    var current = Date.now();
                    return (current - $scope.startTime);
                };

                $scope.setTimerColor = $element[0].setTimerColor = function(color) {
                    $scope.timerColor = 'color: ' + color + ';';
                };

                var updateCounter = function() {
                    calculateTimes();
                    calculateCosts();
                    checkTimerMaximum();
                    timer = $timeout(updateCounter, 1000);
                };

                function checkTimerMaximum() {
                    var maxMilli = $scope.max * 60 * 1000;

                    if ((maxMilli - $scope.getCurrentTime()) < 0) {
                        $scope.setTimerColor('#f00');
                    }
                }

                function reset() {
                    $scope.isRunning = false;
                    $scope.startTime = null;
                    $scope.costPerMinute = 0;
                    $scope.meetingCosts = (0).toFixed(2);
                    $scope.seconds = $scope.minutes = $scope.hours = zeroPad(0, 2);
                    $scope.timerColor = 'color: #000;';
                }

                function calculateTimes() {
                    var timeDiff = $scope.getCurrentTime();

                    $scope.seconds = zeroPad(Math.floor((timeDiff/1000) % 60), 2);
                    $scope.minutes = zeroPad(Math.floor((timeDiff/(60*1000)) % 60), 2);
                    $scope.hours = zeroPad(Math.floor((timeDiff/(60*60*1000)) % 24), 2);
                }

                function calculateCosts() {
                    var timeDiffMinutes = $scope.getCurrentTime()/(60*1000);

                    $scope.meetingCosts = (timeDiffMinutes * $scope.costPerMinute).toFixed(2);
                }

                function zeroPad(num, places) {
                    var zero = places - num.toString().length + 1;
                    return Array(+(zero > 0 && zero)).join("0") + num;
                }

                if ($scope.autoStart === 'true') {
                    $scope.startCounter();
                }
            }]
        }
    }]);
