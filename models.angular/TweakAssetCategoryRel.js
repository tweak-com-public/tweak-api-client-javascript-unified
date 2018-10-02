(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCategoryRel', TweakAssetCategoryRel);

    TweakAssetCategoryRel.$inject = ['$log'];

    function TweakAssetCategoryRel($log) {

        /**
         * Constructor, with class name
         * @param created         {string}    format: date-time  
         * @param modified        {string}    format: date-time  
         * @param id              {string}    
         * @param assetCategoryId {string}    
         * @param assetId         {string}    
         * @param category        {object}    $ref: #/definitions/AssetCategory  
         * @param asset           {object}    $ref: #/definitions/Asset  
         */
        function TweakAssetCategoryRel(data) {
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
        var parameters = ['created', 'modified', 'id', 'assetCategoryId', 'assetId', 'category', 'asset'];
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
        TweakAssetCategoryRel.build = function (data) {
            return new TweakAssetCategoryRel(data);
        };

        TweakAssetCategoryRel.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCategoryRel.build).filter(Boolean);
            }
            return TweakAssetCategoryRel.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCategoryRel;
    }
})();