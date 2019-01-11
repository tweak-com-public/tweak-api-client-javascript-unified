(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetTag', TweakAssetTag);

    TweakAssetTag.$inject = ['$log'];

    function TweakAssetTag($log) {

        /**
         * Constructor, with class name
         * @param created  {string}    format: date-time  
         * @param modified {string}    format: date-time  
         * @param id       {string}    
         * @param assetId  {string}    
         * @param tagId    {string}    
         * @param teamId   {string}    
         * @param asset    {object}    $ref: #/definitions/Asset  
         * @param team     {object}    $ref: #/definitions/Team  
         * @param tag      {object}    $ref: #/definitions/Tag  
         */
        function TweakAssetTag(data) {
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
        var parameters = ['created', 'modified', 'id', 'assetId', 'tagId', 'teamId', 'asset', 'team', 'tag'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object'];
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
        TweakAssetTag.build = function (data) {
            return new TweakAssetTag(data);
        };

        TweakAssetTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetTag.build).filter(Boolean);
            }
            return TweakAssetTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetTag;
    }
})();