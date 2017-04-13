(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakGeoPoint', TweakGeoPoint);

    TweakGeoPoint.$inject = ['$log'];

    function TweakGeoPoint($log) {

        /**
         * Constructor, with class name
         * @param lat {number}    
         * @param lng {number}    
         */
        function TweakGeoPoint(lat, lng) {
            this.lat = lat;
            this.lng = lng;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['lat', 'lng'];
        var parametersType = ['number', 'number'];
        var requiredParameters = [];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error("Required parameter '" + requiredParameter + "' is missing!");
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error("Wrong parameter type for '" + parameters[i] + "': should be '" + parametersType[i] + "'!");
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakGeoPoint.build = function (data) {
            return new TweakGeoPoint(
                data.lat,
                data.lng
            );
        };

        TweakGeoPoint.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakGeoPoint.build).filter(Boolean);
            }
            return TweakGeoPoint.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakGeoPoint;
    }
})();