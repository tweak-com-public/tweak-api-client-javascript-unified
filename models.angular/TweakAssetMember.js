(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetMember', TweakAssetMember);

    TweakAssetMember.$inject = ['$log'];

    function TweakAssetMember($log) {

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
         * @param memberId              {string}                  
         * @param asset                 {object}                  $ref: #/definitions/Asset  
         * @param member                {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakAssetMember(data) {
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
        var parameters = ['message', 'requireToLogin', 'downloadLowResolution', 'options', 'created', 'modified', 'id', 'assetId', 'memberId', 'asset', 'member'];
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
        TweakAssetMember.build = function (data) {
            return new TweakAssetMember(data);
        };

        TweakAssetMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetMember.build).filter(Boolean);
            }
            return TweakAssetMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetMember;
    }
})();