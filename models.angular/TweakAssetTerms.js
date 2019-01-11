(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetTerms', TweakAssetTerms);

    TweakAssetTerms.$inject = ['$log'];

    function TweakAssetTerms($log) {

        /**
         * Constructor, with class name
         * @param name        {string}    
         * @param description {string}    
         * @param created     {string}    format: date-time  
         * @param modified    {string}    format: date-time  
         * @param id          {string}    
         * @param teamId      {string}    
         * @param team        {object}    $ref: #/definitions/Team  
         */
        function TweakAssetTerms(data) {
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
        var parameters = ['name', 'description', 'created', 'modified', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'object'];
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
        TweakAssetTerms.build = function (data) {
            return new TweakAssetTerms(data);
        };

        TweakAssetTerms.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetTerms.build).filter(Boolean);
            }
            return TweakAssetTerms.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetTerms;
    }
})();