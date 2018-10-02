(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCategoryLink', TweakAssetCategoryLink);

    TweakAssetCategoryLink.$inject = ['$log'];

    function TweakAssetCategoryLink($log) {

        /**
         * Constructor, with class name
         * @param id              {string}    
         * @param assetCategoryId {string}    
         * @param assetId         {string}    
         * @param category        {object}    $ref: #/definitions/AssetCategory  
         * @param assets          {object}    $ref: #/definitions/Asset  
         */
        function TweakAssetCategoryLink(data) {
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
        var parameters = ['id', 'assetCategoryId', 'assetId', 'category', 'assets'];
        var parametersType = ['string', 'string', 'string', 'object', 'object'];
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
        TweakAssetCategoryLink.build = function (data) {
            return new TweakAssetCategoryLink(data);
        };

        TweakAssetCategoryLink.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCategoryLink.build).filter(Boolean);
            }
            return TweakAssetCategoryLink.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCategoryLink;
    }
})();