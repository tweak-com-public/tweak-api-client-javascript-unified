(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBuilderConfigProductSizeMaterial', TweakTeamBuilderConfigProductSizeMaterial);

    TweakTeamBuilderConfigProductSizeMaterial.$inject = ['$log'];

    function TweakTeamBuilderConfigProductSizeMaterial($log) {

        /**
         * Constructor, with class name
         * @param bindingType           {string}    enum: none, saddle-stitched, perfect, section-sewn, wiro, cased-in-wiro, pamphlet-stitched, coptic, japanese, screw-post
         * @param defaultBleed          {object}    $ref: #/definitions/Bounds  
         * @param printProfile          {string}    enum: PDFX1A, PDFX3A
         * @param customerTitle         {string}    default:   
         * @param customerDescription   {string}    default:   
         * @param created               {string}    format: date-time  
         * @param modified              {string}    format: date-time  
         * @param id                    {string}    
         * @param productSizeMaterialId {string}    
         * @param pdfColorProfileId     {string}    
         * @param builderConfigId       {string}    
         * @param builderConfig         {object}    $ref: #/definitions/TeamBuilderConfig  
         * @param productSizeMaterial   {object}    $ref: #/definitions/ProductSizeMaterial  
         * @param pdfColorProfile       {object}    $ref: #/definitions/ProductPdfColorProfile  
         */
        function TweakTeamBuilderConfigProductSizeMaterial(data) {
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
        var parameters = ['bindingType', 'defaultBleed', 'printProfile', 'customerTitle', 'customerDescription', 'created', 'modified', 'id', 'productSizeMaterialId', 'pdfColorProfileId', 'builderConfigId', 'builderConfig', 'productSizeMaterial', 'pdfColorProfile'];
        var parametersType = ['string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object'];
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
        TweakTeamBuilderConfigProductSizeMaterial.build = function (data) {
            return new TweakTeamBuilderConfigProductSizeMaterial(data);
        };

        TweakTeamBuilderConfigProductSizeMaterial.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBuilderConfigProductSizeMaterial.build).filter(Boolean);
            }
            return TweakTeamBuilderConfigProductSizeMaterial.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBuilderConfigProductSizeMaterial;
    }
})();