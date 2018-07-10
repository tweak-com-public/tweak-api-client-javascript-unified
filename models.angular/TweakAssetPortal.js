(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetPortal', TweakAssetPortal);

    TweakAssetPortal.$inject = ['$log'];

    function TweakAssetPortal($log) {

        /**
         * Constructor, with class name
         * @param message               {string}                  
         * @param requireToLogin        {boolean}                 default: false  
         * @param downloadLowResolution {boolean}                 default: false  
         * @param options               {string}    [REQUIRED]    enum: downloadCollection, downloadCollectionAndEdit, view
         * @param created               {string}                  format: date-time  
         * @param modified              {string}                  format: date-time  
         * @param id                    {string}                  
         * @param assetId               {string}                  
         * @param portalId              {string}                  
         * @param asset                 {object}                  $ref: #/definitions/Asset  
         * @param portal                {object}                  $ref: #/definitions/Portal  
         */
        function TweakAssetPortal(data) {
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
        var parameters = ['message', 'requireToLogin', 'downloadLowResolution', 'options', 'created', 'modified', 'id', 'assetId', 'portalId', 'asset', 'portal'];
        var parametersType = ['string', 'boolean', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object'];
        var requiredParameters = ['options'];

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
        TweakAssetPortal.build = function (data) {
            return new TweakAssetPortal(data);
        };

        TweakAssetPortal.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetPortal.build).filter(Boolean);
            }
            return TweakAssetPortal.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetPortal;
    }
})();