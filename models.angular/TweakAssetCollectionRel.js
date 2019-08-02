(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCollectionRel', TweakAssetCollectionRel);

    TweakAssetCollectionRel.$inject = ['$log'];

    function TweakAssetCollectionRel($log) {

        /**
         * Constructor, with class name
         * @param created           {string}    format: date-time  
         * @param modified          {string}    format: date-time  
         * @param id                {number}    format: double  
         * @param assetCollectionId {number}    format: double  
         * @param assetId           {number}    format: double  
         */
        function TweakAssetCollectionRel(data) {
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
        var parameters = ['created', 'modified', 'id', 'assetCollectionId', 'assetId'];
        var parametersType = ['string', 'string', 'number', 'number', 'number'];
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
        TweakAssetCollectionRel.build = function (data) {
            return new TweakAssetCollectionRel(data);
        };

        TweakAssetCollectionRel.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCollectionRel.build).filter(Boolean);
            }
            return TweakAssetCollectionRel.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCollectionRel;
    }
})();