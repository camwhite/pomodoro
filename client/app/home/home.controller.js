app = angular.module('blocitoffApp');

app.controller('HomeCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

  $scope.startTime = function(timeLeft) {
    
    sound = new buzz.sound( '/assets/sounds/whoop', {
      formats: ['mp3'],
      preload: true
    });

    $scope.timeLeft = timeLeft;

    $scope.disabled = true;
    
    time = $interval(function() {
      $scope.timeLeft--;
      if($scope.timeLeft === 0) {
        $scope.disabled = true;
        $interval.cancel(time);
        sound.play();
      }
    }, 1000);
  }
  
  $scope.stopTime = function() {
    $scope.disabled = false;
    
    $interval.cancel(time);
  }
  
  $scope.resetTime = function(time) {
    $scope.disabled = false;
    
    $scope.timeLeft = time;
  }

  $scope.name = '';
  $scope.description = '';

  $scope.post = function() {
    $http.post('/api/tasks', {name: $scope.name, description: $scope.description}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(status)
    });
  }

  $scope.get = function() {
    $http.get('/api/tasks').
    success(function(data, status, headers, config) {
      $scope.tasks = [];
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (moment(data[i].created_at) > moment().subtract(7, 'days')) {
          $scope.tasks.push(data[i]);
        }
      }
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(status)
    });
  }

  $scope.delete = function() {
    var task = $scope.tasks[0];
    var id = task._id;

    $http.delete('/api/tasks/' + id).
    success(function(data, status, headers, config) {
      console.log('deleted');
    }).
    error(function(data, status, headers, config) {
      console.log(status);
    })
  }

}]);

app.directive('tabs', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      $(element).click(function() {
        $(this).css('background-color', '#6e8e94');
        $(this).siblings().css('background-color', '#bacacc');
      });
    }
  };
});

app.filter('timecode', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    if(Number.isNaN(seconds)) {
      return '-:--';
    }

    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});