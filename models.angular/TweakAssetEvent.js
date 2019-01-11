(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetEvent', TweakAssetEvent);

    TweakAssetEvent.$inject = ['$log'];

    function TweakAssetEvent($log) {

        /**
         * Constructor, with class name
         * @param description       {string}    [REQUIRED]    
         * @param context           {object}    [REQUIRED]    
         * @param action            {string}                  enum: created, uploaded, approved, rejected, commented, deleted, shared
         * @param model             {string}    [REQUIRED]    enum: Asset, AssetCategory, AssetCollection
         * @param modelId           {string}    [REQUIRED]    
         * @param created           {string}                  format: date-time  
         * @param modified          {string}                  format: date-time  
         * @param id                {string}                  
         * @param assetId           {string}                  
         * @param assetCollectionId {string}                  
         * @param assetCategoryId   {string}                  
         * @param teamId            {string}                  
         * @param teamMemberId      {string}                  
         * @param asset             {object}                  $ref: #/definitions/Asset  
         * @param assetCollection   {object}                  $ref: #/definitions/AssetCollection  
         * @param assetCategory     {object}                  $ref: #/definitions/AssetCategory  
         * @param teamMember        {object}                  $ref: #/definitions/TeamMember  
         * @param team              {object}                  $ref: #/definitions/Team  
         */
        function TweakAssetEvent(data) {
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
        var parameters = ['description', 'context', 'action', 'model', 'modelId', 'created', 'modified', 'id', 'assetId', 'assetCollectionId', 'assetCategoryId', 'teamId', 'teamMemberId', 'asset', 'assetCollection', 'assetCategory', 'teamMember', 'team'];
        var parametersType = ['string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object', 'object'];
        var requiredParameters = ['description', 'context', 'model', 'modelId'];

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
        TweakAssetEvent.build = function (data) {
            return new TweakAssetEvent(data);
        };

        TweakAssetEvent.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetEvent.build).filter(Boolean);
            }
            return TweakAssetEvent.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetEvent;
    }
})();