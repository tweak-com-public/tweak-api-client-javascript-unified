(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBuilderConfigProductGroup', TweakTeamBuilderConfigProductGroup);

    TweakTeamBuilderConfigProductGroup.$inject = ['$log'];

    function TweakTeamBuilderConfigProductGroup($log) {

        /**
         * Constructor, with class name
         * @param created         {string}    format: date-time  
         * @param modified        {string}    format: date-time  
         * @param id              {string}    
         * @param productGroupId  {string}    
         * @param builderConfigId {string}    
         * @param builderConfig   {object}    $ref: #/definitions/TeamBuilderConfig  
         * @param productGroup    {object}    $ref: #/definitions/ProductGroup  
         */
        function TweakTeamBuilderConfigProductGroup(data) {
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
        var parameters = ['created', 'modified', 'id', 'productGroupId', 'builderConfigId', 'builderConfig', 'productGroup'];
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
        TweakTeamBuilderConfigProductGroup.build = function (data) {
            return new TweakTeamBuilderConfigProductGroup(data);
        };

        TweakTeamBuilderConfigProductGroup.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBuilderConfigProductGroup.build).filter(Boolean);
            }
            return TweakTeamBuilderConfigProductGroup.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBuilderConfigProductGroup;
    }
})();