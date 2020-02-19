(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakS3Image', TweakS3Image);

    TweakS3Image.$inject = ['$log'];

    function TweakS3Image($log) {

        /**
         * Constructor, with class name
         * @param publicId           {string}                  
         * @param version            {string}                  
         * @param signature          {string}                  
         * @param width              {number}                  format: double  
         * @param height             {number}                  format: double  
         * @param format             {string}                  
         * @param resourceType       {string}                  enum: image
         * @param createdAt          {string}                  
         * @param tags               {array}                   items: type: string    
         * @param bytes              {number}                  format: double  
         * @param type               {string}                  
         * @param pages              {number}                  format: double  
         * @param etag               {string}                  
         * @param url                {string}    [REQUIRED]    
         * @param secureUrl          {string}    [REQUIRED]    
         * @param thumbnailUrl       {string}                  
         * @param thumbnailSecureUrl {string}                  
         * @param smUrl              {string}                  
         * @param lgUrl              {string}                  
         * @param originalFilename   {string}                  
         * @param isBase64           {boolean}                 default: false  
         * @param resp               {object}                  
         * @param id                 {string}                  
         */
        function TweakS3Image(data) {
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
        var parameters = ['publicId', 'version', 'signature', 'width', 'height', 'format', 'resourceType', 'createdAt', 'tags', 'bytes', 'type', 'pages', 'etag', 'url', 'secureUrl', 'thumbnailUrl', 'thumbnailSecureUrl', 'smUrl', 'lgUrl', 'originalFilename', 'isBase64', 'resp', 'id'];
        var parametersType = ['string', 'string', 'string', 'number', 'number', 'string', 'string', 'string', 'array', 'number', 'string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'boolean', 'object', 'string'];
        var requiredParameters = ['url', 'secureUrl'];

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
        TweakS3Image.build = function (data) {
            return new TweakS3Image(data);
        };

        TweakS3Image.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakS3Image.build).filter(Boolean);
            }
            return TweakS3Image.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakS3Image;
    }
})();