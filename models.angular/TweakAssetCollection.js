(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCollection', TweakAssetCollection);

    TweakAssetCollection.$inject = ['$log'];

    function TweakAssetCollection($log) {

        /**
         * Constructor, with class name
         * @param name         {string}    [REQUIRED]    
         * @param code         {string}    [REQUIRED]    
         * @param thumbnailUrl {string}                  
         * @param created      {string}                  format: date-time  
         * @param modified     {string}                  format: date-time  
         * @param id           {string}                  
         * @param teamId       {string}                  
         * @param assets       {array}                   items: $ref: #/definitions/Asset    
         * @param team         {object}                  $ref: #/definitions/Team  
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
        var parameters = ['name', 'code', 'thumbnailUrl', 'created', 'modified', 'id', 'teamId', 'assets', 'team'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object'];
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