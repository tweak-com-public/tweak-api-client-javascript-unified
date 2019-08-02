(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetRatings', TweakAssetRatings);

    TweakAssetRatings.$inject = ['$log'];

    function TweakAssetRatings($log) {

        /**
         * Constructor, with class name
         * @param starts       {number}    format: double  
         * @param color        {number}    format: double  
         * @param favorite     {boolean}   
         * @param created      {string}    format: date-time  
         * @param modified     {string}    format: date-time  
         * @param id           {number}    format: double  
         * @param assetId      {number}    format: double  
         * @param teamMemberId {number}    format: double  
         */
        function TweakAssetRatings(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }


            for (var i = 0; i < parameters.length; i++) {

                if (this[parameters[i]] && parametersType[i] === 'string' ) {

                    this[parameters[i]] = '' + this[parameters[i]];

                }

            }


            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['starts', 'color', 'favorite', 'created', 'modified', 'id', 'assetId', 'teamMemberId'];
        var parametersType = ['number', 'number', 'boolean', 'string', 'string', 'number', 'number', 'number'];
        var requiredParameters = [];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error('Required parameter `' + requiredParameter + '` is missing!');
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                if (parametersType[i].match(/^any$/i)) {
                    continue;
                }
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakAssetRatings.build = function (data) {
            return new TweakAssetRatings(data);
        };

        TweakAssetRatings.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetRatings.build).filter(Boolean);
            }
            return TweakAssetRatings.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetRatings;
    }
})();