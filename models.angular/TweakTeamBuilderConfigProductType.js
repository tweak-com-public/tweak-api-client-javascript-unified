(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBuilderConfigProductType', TweakTeamBuilderConfigProductType);

    TweakTeamBuilderConfigProductType.$inject = ['$log'];

    function TweakTeamBuilderConfigProductType($log) {

        /**
         * Constructor, with class name
         * @param created         {string}    format: date-time  
         * @param modified        {string}    format: date-time  
         * @param id              {string}    
         * @param productTypeId   {string}    
         * @param builderConfigId {string}    
         * @param builderConfig   {object}    $ref: #/definitions/TeamBuilderConfig  
         * @param productType     {object}    $ref: #/definitions/ProductType  
         */
        function TweakTeamBuilderConfigProductType(data) {
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
        var parameters = ['created', 'modified', 'id', 'productTypeId', 'builderConfigId', 'builderConfig', 'productType'];
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
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakTeamBuilderConfigProductType.build = function (data) {
            return new TweakTeamBuilderConfigProductType(data);
        };

        TweakTeamBuilderConfigProductType.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBuilderConfigProductType.build).filter(Boolean);
            }
            return TweakTeamBuilderConfigProductType.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBuilderConfigProductType;
    }
})();