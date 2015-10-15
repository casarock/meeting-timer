angular.module('app.controllers', ['mytimer'])

.controller('meetingTimerCtrl', function($scope) {
    var myTimer = document.getElementById('myTimerElement');
    $scope.meetingMembers = [];

    for (var i = 1; i <21; i++) {
        $scope.meetingMembers.push({
            label: ""+i,
            value: i
        });
    }

    $scope.durations = [
        {
            label: "1",
            value: "1"
        },
        {
            label: "5",
            value: "5"
        },
        {
            label: "10",
            value: "10"
        },
        {
            label: "15",
            value: "15"
        },
        {
            label: "30",
            value: "30"
        },
        {
            label: "45",
            value: "45"
        },
        {
            label: "60",
            value: "60"
        },
        {
            label: "90",
            value: "90"
        },
        {
            label: "120",
            value: "120"
        }
    ];

    $scope.memberList = $scope.meetingMembers[1];
    $scope.durationList = $scope.durations[3];

    $scope.timerIsRunning = false;
    $scope.participants = 2;
    $scope.meetingDuration = 15;
    $scope.dailyRate = '1000';
    $scope.costs = 0;
    $scope.estimatedCosts = 0;
    $scope.costsPerMinute = 0;

    calculateCosts();

    $scope.setDailyRate = function(newRate) {
        $scope.dailyRate = newRate;
        calculateCosts();
    }

    $scope.startTimer = function() {
        calculateCosts();
        myTimer.startCounter($scope.costsPerMinute);
        $scope.timerIsRunning = true;
    };

    $scope.stopTimer = function() {
        myTimer.stopCounter();
        $scope.timerIsRunning = false;
    };

    $scope.startStopTimer = function() {
        if ($scope.timerIsRunning) {
            $scope.stopTimer();
        }
        else {
            $scope.startTimer();
        }
    };

    $scope.setMembers = function(members) {
        if(!$scope.timerIsRunning) {
            $scope.participants = members.value;
            calculateCosts();
        }
    };

    $scope.setDurationTime = function(duration) {
        if(!$scope.timerIsRunning) {
            $scope.meetingDuration = duration.value;
            calculateCosts();
        }
    };

    function calculateCosts() {
        var cpm = $scope.participants * ($scope.dailyRate/8/60);
        $scope.costsPerMinute = cpm.toFixed(2);
        $scope.estimatedCosts = ($scope.meetingDuration * cpm).toFixed(2);
    }
})

.controller('aboutCtrl', function($scope) {
    console.log("about");
});
