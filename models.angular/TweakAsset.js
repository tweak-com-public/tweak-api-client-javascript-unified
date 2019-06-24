(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAsset', TweakAsset);

    TweakAsset.$inject = ['$log'];

    function TweakAsset($log) {

        /**
         * Constructor, with class name
         * @param modelVersion           {string}    [REQUIRED]    default: 1  
         * @param publicId               {string}    [REQUIRED]    
         * @param storageEngine          {string}                  enum: cloudinary, s3
         * @param originalFilename       {string}                  
         * @param resourceType           {string}                  
         * @param etag                   {string}                  
         * @param format                 {string}                  
         * @param width                  {number}                  format: double  
         * @param height                 {number}                  format: double  
         * @param bytes                  {number}                  format: double  
         * @param bitRate                {number}                  format: double  
         * @param frameRate              {number}                  format: double  
         * @param duration               {number}                  format: double  
         * @param description            {string}                  
         * @param resources              {object}                  
         * @param urls                   {object}                  
         * @param isAudio                {boolean}                 
         * @param status                 {string}                  enum: pendingAction, approved, needsChanges, rejected
         * @param imageMetadata          {object}                  
         * @param videoMetadata          {object}                  
         * @param audioMetadata          {object}                  
         * @param rawMetadata            {object}                  
         * @param searchImageMetadata    {object}                  
         * @param searchVideoMetadata    {object}                  
         * @param searchAudioMetadata    {object}                  
         * @param searchRawMetadata      {object}                  
         * @param searchTags             {array}                   items: $ref: #/definitions/x-any    
         * @param searchOriginalFilename {string}                  
         * @param created                {string}                  format: date-time  
         * @param modified               {string}                  format: date-time  
         * @param id                     {object}                  $ref: #/definitions/ObjectID  
         * @param uploadId               {object}                  $ref: #/definitions/ObjectID  
         * @param teamId                 {string}                  
         * @param TeamMemberId           {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakAsset(data) {
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
        var parameters = ['modelVersion', 'publicId', 'storageEngine', 'originalFilename', 'resourceType', 'etag', 'format', 'width', 'height', 'bytes', 'bitRate', 'frameRate', 'duration', 'description', 'resources', 'urls', 'isAudio', 'status', 'imageMetadata', 'videoMetadata', 'audioMetadata', 'rawMetadata', 'searchImageMetadata', 'searchVideoMetadata', 'searchAudioMetadata', 'searchRawMetadata', 'searchTags', 'searchOriginalFilename', 'created', 'modified', 'id', 'uploadId', 'teamId', 'TeamMemberId'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'number', 'number', 'number', 'string', 'object', 'object', 'boolean', 'string', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'array', 'string', 'string', 'string', 'object', 'object', 'string', 'object'];
        var requiredParameters = ['modelVersion', 'publicId'];

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
        TweakAsset.build = function (data) {
            return new TweakAsset(data);
        };

        TweakAsset.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAsset.build).filter(Boolean);
            }
            return TweakAsset.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAsset;
    }
})();