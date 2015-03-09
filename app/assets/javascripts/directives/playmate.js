angular.module('portfolioApp').directive('playmate', function($animate) {
  return {
    restrict: 'AE',
    replace: true,
    scope:{
        data: '=data',
        tooltip: '=tooltip'
    },
    templateUrl: '/assets/partials/playmate.html',
    link: function(scope, element, attrs) {
      console.log(scope.tooltip);

      scope.$watch(function() {return element.attr('class'); }, function(newValue){
                if (element.hasClass(scope.data.name)) {
                  element.css({
                      'background-color': '#A6A4A4'
                  });
                } else {
                  element.css({
                      'background-color': '#E6E3E3'
                  });
                }
            });

      // if(scope.tooltip == scope.data.name){
      //   console.log('I AM IN THE CONDITION!');
        // element.css({
        //     'background-color': 'red'
        // });
      // }
    }
  };
});
