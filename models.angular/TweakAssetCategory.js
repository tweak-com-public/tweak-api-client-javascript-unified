(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCategory', TweakAssetCategory);

    TweakAssetCategory.$inject = ['$log'];

    function TweakAssetCategory($log) {

        /**
         * Constructor, with class name
         * @param name        {string}    [REQUIRED]    
         * @param code        {string}    [REQUIRED]    
         * @param description {string}                  
         * @param textValue   {string}                  
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {string}                  
         * @param teamId      {string}                  
         * @param permission  {object}                  $ref: #/definitions/AssetCategoryPermissionSet  
         * @param options     {array}                   items: $ref: #/definitions/AssetOption    
         * @param assetLinks  {array}                   items: $ref: #/definitions/Asset    
         * @param team        {object}                  $ref: #/definitions/Team  
         * @param assets      {array}                   items: $ref: #/definitions/Asset    
         */
        function TweakAssetCategory(data) {
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
        var parameters = ['name', 'code', 'description', 'textValue', 'created', 'modified', 'id', 'teamId', 'permission', 'options', 'assetLinks', 'team', 'assets'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'object', 'array'];
        var requiredParameters = ['name', 'code'];

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
        TweakAssetCategory.build = function (data) {
            return new TweakAssetCategory(data);
        };

        TweakAssetCategory.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCategory.build).filter(Boolean);
            }
            return TweakAssetCategory.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCategory;
    }
})();