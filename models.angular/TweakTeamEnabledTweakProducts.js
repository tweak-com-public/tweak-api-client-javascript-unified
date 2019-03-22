(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamEnabledTweakProducts', TweakTeamEnabledTweakProducts);

    TweakTeamEnabledTweakProducts.$inject = ['$log'];

    function TweakTeamEnabledTweakProducts($log) {

        /**
         * Constructor, with class name
         * @param created        {string}    format: date-time  
         * @param modified       {string}    format: date-time  
         * @param id             {string}    
         * @param teamId         {string}    
         * @param tweakProductId {string}    
         * @param team           {object}    $ref: #/definitions/Team  
         * @param tweakProduct   {object}    $ref: #/definitions/TweakProduct  
         */
        function TweakTeamEnabledTweakProducts(data) {
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
        var parameters = ['created', 'modified', 'id', 'teamId', 'tweakProductId', 'team', 'tweakProduct'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'object'];
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
        TweakTeamEnabledTweakProducts.build = function (data) {
            return new TweakTeamEnabledTweakProducts(data);
        };

        TweakTeamEnabledTweakProducts.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamEnabledTweakProducts.build).filter(Boolean);
            }
            return TweakTeamEnabledTweakProducts.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamEnabledTweakProducts;
    }
})();