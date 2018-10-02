(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetOption', TweakAssetOption);

    TweakAssetOption.$inject = ['$log'];

    function TweakAssetOption($log) {

        /**
         * Constructor, with class name
         * @param name            {string}    [REQUIRED]    
         * @param code            {string}    [REQUIRED]    
         * @param description     {string}                  
         * @param order           {number}    [REQUIRED]    format: double  
         * @param id              {string}                  
         * @param assetCategoryId {string}                  
         * @param category        {object}                  $ref: #/definitions/AssetCategory  
         * @param assets          {array}                   items: $ref: #/definitions/Asset    
         */
        function TweakAssetOption(data) {
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
        var parameters = ['name', 'code', 'description', 'order', 'id', 'assetCategoryId', 'category', 'assets'];
        var parametersType = ['string', 'string', 'string', 'number', 'string', 'string', 'object', 'array'];
        var requiredParameters = ['name', 'code', 'order'];

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
        TweakAssetOption.build = function (data) {
            return new TweakAssetOption(data);
        };

        TweakAssetOption.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetOption.build).filter(Boolean);
            }
            return TweakAssetOption.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetOption;
    }
})();