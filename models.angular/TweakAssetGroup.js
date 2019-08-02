(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetGroup', TweakAssetGroup);

    TweakAssetGroup.$inject = ['$log'];

    function TweakAssetGroup($log) {

        /**
         * Constructor, with class name
         * @param name             {string}    [REQUIRED]    
         * @param isDefaultForTeam {boolean}   [REQUIRED]    default: false  
         * @param created          {string}                  format: date-time  
         * @param modified         {string}                  format: date-time  
         * @param id               {number}                  format: double  
         * @param teamId           {string}                  
         */
        function TweakAssetGroup(data) {
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
        var parameters = ['name', 'isDefaultForTeam', 'created', 'modified', 'id', 'teamId'];
        var parametersType = ['string', 'boolean', 'string', 'string', 'number', 'string'];
        var requiredParameters = ['name', 'isDefaultForTeam'];

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
        TweakAssetGroup.build = function (data) {
            return new TweakAssetGroup(data);
        };

        TweakAssetGroup.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetGroup.build).filter(Boolean);
            }
            return TweakAssetGroup.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetGroup;
    }
})();