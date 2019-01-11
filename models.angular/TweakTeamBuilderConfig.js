(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBuilderConfig', TweakTeamBuilderConfig);

    TweakTeamBuilderConfig.$inject = ['$log'];

    function TweakTeamBuilderConfig($log) {

        /**
         * Constructor, with class name
         * @param name                    {string}    
         * @param debugMode               {boolean}   default: false  
         * @param features                {object}    default:   
         * @param ui                      {object}    default:   
         * @param isDefault               {boolean}   default: false  
         * @param created                 {string}    format: date-time  
         * @param modified                {string}    format: date-time  
         * @param id                      {string}    
         * @param teamId                  {string}    
         * @param team                    {object}    $ref: #/definitions/Team  
         * @param portals                 {array}     items: $ref: #/definitions/Portal    
         * @param productGroups           {array}     items: $ref: #/definitions/ProductGroup    
         * @param productTypes            {array}     items: $ref: #/definitions/ProductType    
         * @param productSizes            {array}     items: $ref: #/definitions/ProductSize    
         * @param productSizeMaterials    {array}     items: $ref: #/definitions/ProductSizeMaterial    
         * @param productSizeMaterialsRel {array}     items: $ref: #/definitions/TeamBuilderConfigProductSizeMaterial    
         */
        function TweakTeamBuilderConfig(data) {
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
        var parameters = ['name', 'debugMode', 'features', 'ui', 'isDefault', 'created', 'modified', 'id', 'teamId', 'team', 'portals', 'productGroups', 'productTypes', 'productSizes', 'productSizeMaterials', 'productSizeMaterialsRel'];
        var parametersType = ['string', 'boolean', 'object', 'object', 'boolean', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'array', 'array', 'array', 'array'];
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
        TweakTeamBuilderConfig.build = function (data) {
            return new TweakTeamBuilderConfig(data);
        };

        TweakTeamBuilderConfig.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBuilderConfig.build).filter(Boolean);
            }
            return TweakTeamBuilderConfig.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBuilderConfig;
    }
})();