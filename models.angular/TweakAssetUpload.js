(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetUpload', TweakAssetUpload);

    TweakAssetUpload.$inject = ['$log'];

    function TweakAssetUpload($log) {

        /**
         * Constructor, with class name
         * @param status           {array}     [REQUIRED]    items: $ref: #/definitions/x-any    
         * @param isEmpty          {boolean}                 
         * @param rejectionMessage {string}                  
         * @param created          {string}                  format: date-time  
         * @param modified         {string}                  format: date-time  
         * @param id               {string}                  
         * @param teamId           {string}                  
         * @param uploaderId       {string}                  
         * @param assets           {array}                   items: $ref: #/definitions/Asset    
         * @param team             {object}                  $ref: #/definitions/Team  
         * @param uploader         {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakAssetUpload(data) {
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
        var parameters = ['status', 'isEmpty', 'rejectionMessage', 'created', 'modified', 'id', 'teamId', 'uploaderId', 'assets', 'team', 'uploader'];
        var parametersType = ['array', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object', 'object'];
        var requiredParameters = ['status'];

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
        TweakAssetUpload.build = function (data) {
            return new TweakAssetUpload(data);
        };

        TweakAssetUpload.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetUpload.build).filter(Boolean);
            }
            return TweakAssetUpload.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetUpload;
    }
})();