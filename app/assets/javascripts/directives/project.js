angular.module('portfolioApp').directive('project', function($animate) {
  return {
    restrict: 'AE',
    replace: true,
    scope:{
        data: '=data'
    },
    templateUrl: '/assets/partials/project.html',
    link: function(scope, element, attrs) {
        var lightboxElement = scope.data.video_url || scope.data.img_url;
        scope.lightboxElement = lightboxElement;
        var name = scope.data.name;
        element.css({
            'background-image': 'url(' + scope.data.img_url +')',
            'background-size' : 'cover',
            'background-position' : 'center'
        });
        element.on('mouseenter', function() {
            scope.data.name = "Check it Out";
            scope.$apply();
        });
        element.on('mouseleave', function() {
            scope.data.name = name;
            scope.$apply();
        });
    }
  };
});
