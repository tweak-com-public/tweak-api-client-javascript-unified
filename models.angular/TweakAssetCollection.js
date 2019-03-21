(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCollection', TweakAssetCollection);

    TweakAssetCollection.$inject = ['$log'];

    function TweakAssetCollection($log) {

        /**
         * Constructor, with class name
         * @param name          {string}    [REQUIRED]    
         * @param code          {string}    [REQUIRED]    
         * @param thumbnailUrl  {string}                  
         * @param viewCount     {number}                  default: 0  format: double  
         * @param downloadCount {number}                  default: 0  format: double  
         * @param shareCount    {number}                  default: 0  format: double  
         * @param status        {string}    [REQUIRED]    enum: published, pendingAction, rejected, inReview
         * @param created       {string}                  format: date-time  
         * @param modified      {string}                  format: date-time  
         * @param id            {object}                  $ref: #/definitions/ObjectID  
         * @param teamId        {string}                  
         * @param teamMemberId  {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakAssetCollection(data) {
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
        var parameters = ['name', 'code', 'thumbnailUrl', 'viewCount', 'downloadCount', 'shareCount', 'status', 'created', 'modified', 'id', 'teamId', 'teamMemberId'];
        var parametersType = ['string', 'string', 'string', 'number', 'number', 'number', 'string', 'string', 'string', 'object', 'string', 'object'];
        var requiredParameters = ['name', 'code', 'status'];

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
        TweakAssetCollection.build = function (data) {
            return new TweakAssetCollection(data);
        };

        TweakAssetCollection.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCollection.build).filter(Boolean);
            }
            return TweakAssetCollection.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCollection;
    }
})();