(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakProductSizeMaterial', TweakProductSizeMaterial);

    TweakProductSizeMaterial.$inject = ['$log'];

    function TweakProductSizeMaterial($log) {

        /**
         * Constructor, with class name
         * @param code              {string}    [REQUIRED]    
         * @param description       {string}                  
         * @param thumbnail         {string}                  
         * @param status            {string}                  enum: public, private
         * @param bindingType       {string}                  enum: none, saddle-stitched, perfect, section-sewn, wiro, cased-in-wiro, pamphlet-stitched, coptic, japanese, screw-post
         * @param defaultBleed      {object}                  default: right: 0    $ref: #/definitions/Bounds  
         * @param printProfile      {string}                  enum: PDFX1A, PDFX3A
         * @param created           {string}                  format: date-time  
         * @param modified          {string}                  format: date-time  
         * @param id                {string}                  
         * @param materialId        {string}                  
         * @param teamId            {string}                  
         * @param pdfColorProfileId {string}                  
         * @param sizeId            {string}                  
         * @param size              {object}                  $ref: #/definitions/ProductSize  
         * @param material          {object}                  $ref: #/definitions/ProductMaterial  
         * @param team              {object}                  $ref: #/definitions/Team  
         * @param pdfColorProfile   {object}                  $ref: #/definitions/ProductPdfColorProfile  
         */
        function TweakProductSizeMaterial(data) {
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
        var parameters = ['code', 'description', 'thumbnail', 'status', 'bindingType', 'defaultBleed', 'printProfile', 'created', 'modified', 'id', 'materialId', 'teamId', 'pdfColorProfileId', 'sizeId', 'size', 'material', 'team', 'pdfColorProfile'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object'];
        var requiredParameters = ['code'];

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
        TweakProductSizeMaterial.build = function (data) {
            return new TweakProductSizeMaterial(data);
        };

        TweakProductSizeMaterial.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakProductSizeMaterial.build).filter(Boolean);
            }
            return TweakProductSizeMaterial.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakProductSizeMaterial;
    }
})();