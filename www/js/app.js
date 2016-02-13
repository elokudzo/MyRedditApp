// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
var app = angular.module('myreddit', ['ionic','angularMoment']);

app.controller('RedditCtrl',function($http, $scope){

$scope.stories = [];



function loadStories(params,callback){

  $http.get('https://www.reddit.com/r/Android/new/.json',{params: params})
.success(function(response){

var stories = [];
angular.forEach(response.data.children,function(child){
  
var story = child.data;
console.log(child.data);
if(!story.thumbnail  || story.thumbnail=='self'|| story.thumbnail=='default'){
  story.thumbnail = 'http://www.redditstatic.com/icon.png';

}
  stories.push(child.data);
  
});
callback(stories);

});

}
 
$scope.loadOlderStories = function(){
var params = {};

if($scope.stories.length>0){
  params['after']= $scope.stories[$scope.stories.length -1].name;
}
loadStories(params,function(olderStories){
  $scope.stories = $scope.stories.concat(olderStories);
 $scope.$broadcast('scroll.infiniteScrollComplete'); 
});

};
 
$scope.loadNewerStories = function(){
 
var params = {'before': $scope.stories[0].name};
loadStories(params,function(newerStories){

$scope.stories = newerStories.concat($scope.stories);
$scope.$broadcast('scroll.refreshComplete');
});

};

$scope.openLink = function(url){
  window.open(url,'_blank');
}

});



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.cordova && window.cordova.InAppBrowser){
      window.open = window.cordova.InAppBrowser.open;
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());