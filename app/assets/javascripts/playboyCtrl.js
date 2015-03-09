'use strict';

angular.module('portfolioApp').controller('PlayboyCtrl', function($scope, $http, $filter) {

  $scope.playmates = [];
  $scope.states = [];
  $scope.sorted = [];
  $scope.state = 'CA';
  var states = [];


  var map = new Datamap({
    element: document.getElementById('usa-map'),
    scope: 'usa',
    data: $scope.states,
    done: function(datamap) {

      $http.get('/playmates.json').
      success(function(data, status, headers, config) {
        $scope.playmates = data.playmates;
        $scope.sorted = data.playmates;
        states = data.states;
        $scope.colorData = hairColors($scope.sorted);
        $scope.measurementData = measurements($scope.sorted);

        // map click function
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
          var found = $filter('filter')(states, {name: stateKeys[geo.properties.name]}, true);
          $scope.colorData = hairColors($filter('filter')($scope.playmates, {'birthplace': {'state' : stateKeys[geo.properties.name]}},true));
          $scope.measurementData = measurements($filter('filter')($scope.playmates, {'birthplace': {'state' : stateKeys[geo.properties.name]}},true));
          $scope.state = found[0].name;
          $scope.$apply();
        });

        datamap.updateChoropleth(createColors(states));
      }).
      error(function(data, status, headers, config) {
        console.log('cannot get data!');
      });
    },
    geographyConfig: {
        // map hover function
        popupTemplate: function(geo, data) {
          var found = $filter('filter')(states, {name: stateKeys[geo.properties.name]}, true);
          return ['<div class="hoverinfo"><strong>',
                    geo.properties.name + ': ' + found[0].num,
                    '</strong></div>'].join('');
        }
    }
  });

$scope.colorOptions = {
    chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        objectequality:"true",
        transitionDuration: 500,
        labelThreshold: 0.01,
        legend: {
            margin: {
                top: 5,
                right: 35,
                bottom: 5,
                left: 0
            }
        }
    }
};

$scope.measurementOptions = {
    chart: {
        type: 'scatterChart',
        height: 400,
        color: d3.scale.category10().range(),
        scatter: {
            onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        tooltipContent: function(key) {
            return '<h3>' + key + '</h3>';
        },
        transitionDuration: 350,
        xAxis: {
            axisLabel: 'X Axis',
            tickFormat: function(d){
                return d3.format('.02f')(d);
            }
        },
        yAxis: {
            axisLabel: 'Y Axis',
            tickFormat: function(d){
                return d3.format('.02f')(d);
            },
            axisLabelDistance: 300
        },
        dispatch:{
          tooltipShow: function(e){
            $scope.$apply(function() {
               $scope.tooltip = e.point.name;
           });
          }
        }
    }
};
function measurements(playmates){
  var data = [];
  var dataHash = {'A': [],'B': [],'C': [],'D': [], 'E': []};
  for(var i=0; i<playmates.length; i++){
    if (playmates[i].measurements){
      if (playmates[i].measurements.cupSize.toUpperCase() in dataHash
        && isNumeric(playmates[i].measurements.ratio[0])
        && isNumeric(playmates[i].measurements.ratio[1])){
        dataHash[playmates[i].measurements.cupSize.toUpperCase()].push(
            { x: parseInt(playmates[i].measurements.ratio[0])+0,
              y: playmates[i].likes,
              name: playmates[i].name,
              size: playmates[i].measurements.ratio[1],
              shape: 'circle',
              series: playmates[i].measurements.cupSize.toUpperCase()
            }
          );
      }
    }
  }
  for(var j=0; j<Object.keys(dataHash).length; j++){
    data.push({ 'key' : Object.keys(dataHash)[j], 'values' : dataHash[Object.keys(dataHash)[j]] });
  }
  return data;
}

function hairColors(playmates){
  var colors = {'Blonde' : 0, 'Brown' : 0, 'Black' : 0, 'Red' : 0,  'Auburn' : 0};
  var colorData = [];
  for (var i=0; i<playmates.length; i++){
    if(i<3 && playmates[i]['haircolor']!= undefined){
      colors[playmates[i]['haircolor']] += 1;
    }
  }
  for(var j=0; j<Object.keys(colors).length; j++){
    colorData.push({ 'key' : Object.keys(colors)[j], 'y' : colors[Object.keys(colors)[j]] });
  }
  return colorData;
}

function createColors(states){
  // var colors = d3.scale.ordinal().range(colorbrewer.PuOr[11]);
  var colors = d3.scale.category20c();
  var mapColors = {};
  for (var i=0; i<states.length; i++){
    var key = states[i].name;
    var color = colors(states[i].num);
    mapColors[key] = color;
  }
  return mapColors;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// state conversion
var stateKeys = { 
  'Alabama' : 'AL',
  'Alaska' : 'AK',
  'Arizona' : 'AZ',
  'Arkansas' : 'AR',
  'California' : 'CA',
  'Colorado' : 'CO',
  'Connecticut' : 'CT',
  'Delaware' : 'DE',
  'Florida' : 'FL',
  'Georgia' : 'GA',
  'Hawaii' : 'HI',
  'Idaho' : 'ID',
  'Illinois' : 'IL',
  'Indiana' : 'IN',
  'Iowa' : 'IA',
  'Kansas' : 'KS',
  'Kentucky' : 'KY',
  'Louisiana' : 'LA',
  'Maine' : 'ME',
  'Maryland' : 'MD',
  'Massachusetts' : 'MA',
  'Michigan' : 'MI',
  'Minnesota' : 'MN',
  'Mississippi' : 'MS',
  'Missouri' : 'MO',
  'Montana' : 'MT',
  'Nebraska' : 'NE',
  'Nevada' : 'NV',
  'New Hampshire' : 'NH',
  'New Jersey' : 'NJ',
  'New Mexico' : 'NM',
  'New York' : 'NY',
  'North Carolina' : 'NC',
  'North Dakota' : 'ND',
  'Ohio' : 'OH',
  'Oklahoma' : 'OK',
  'Oregon' : 'OR',
  'Pennsylvania' : 'PA',
  'Rhode Island' : 'RI',
  'South Carolina' : 'SC',
  'South Dakota' : 'SD',
  'Tennessee' : 'TN',
  'Texas' : 'TX',
  'Utah' : 'UT',
  'Vermont' : 'VT',
  'Virginia' : 'VA',
  'Washington' : 'WA',
  'West Virginia' : 'WV',
  'Wisconsin' : 'WI',
  'Wyoming' : 'WY',
  'District of Columbia' : 'DC',
  'Federated States of Micronesia' : 'FM',
  'Guam' : 'GU',
  'Marshall Islands' : 'MH',
  'Northern Mariana Islands' : 'MP',
  'Palau' : 'PW',
  'Puerto Rico' : 'PR',
  'Virgin Islands' : 'VI'
};


}).$inject = ['$scope', '$http', '$filter'];
