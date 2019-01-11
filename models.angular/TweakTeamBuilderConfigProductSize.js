(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBuilderConfigProductSize', TweakTeamBuilderConfigProductSize);

    TweakTeamBuilderConfigProductSize.$inject = ['$log'];

    function TweakTeamBuilderConfigProductSize($log) {

        /**
         * Constructor, with class name
         * @param created         {string}    format: date-time  
         * @param modified        {string}    format: date-time  
         * @param id              {string}    
         * @param productSizeId   {string}    
         * @param builderConfigId {string}    
         * @param builderConfig   {object}    $ref: #/definitions/TeamBuilderConfig  
         * @param productSize     {object}    $ref: #/definitions/ProductSize  
         */
        function TweakTeamBuilderConfigProductSize(data) {
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
        var parameters = ['created', 'modified', 'id', 'productSizeId', 'builderConfigId', 'builderConfig', 'productSize'];
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
        TweakTeamBuilderConfigProductSize.build = function (data) {
            return new TweakTeamBuilderConfigProductSize(data);
        };

        TweakTeamBuilderConfigProductSize.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBuilderConfigProductSize.build).filter(Boolean);
            }
            return TweakTeamBuilderConfigProductSize.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBuilderConfigProductSize;
    }
})();