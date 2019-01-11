(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetVersion', TweakAssetVersion);

    TweakAssetVersion.$inject = ['$log'];

    function TweakAssetVersion($log) {

        /**
         * Constructor, with class name
         * @param publicId       {string}    [REQUIRED]    
         * @param secureUrl      {string}    [REQUIRED]    
         * @param resourceType   {string}    [REQUIRED]    
         * @param type           {string}    [REQUIRED]    
         * @param etag           {string}    [REQUIRED]    
         * @param format         {string}                  
         * @param bytes          {number}    [REQUIRED]    format: double  
         * @param description    {string}                  
         * @param status         {string}    [REQUIRED]    enum: pendingAction, approved, needsChanges, rejected
         * @param thumbnailUrl   {string}                  
         * @param version        {number}                  format: double  
         * @param versionNumber  {number}                  default: 1  format: double  
         * @param signature      {string}                  
         * @param placeholder    {string}                  
         * @param width          {number}                  format: double  
         * @param height         {number}                  format: double  
         * @param pages          {number}                  format: double  
         * @param bitRate        {number}                  format: double  
         * @param path           {string}                  
         * @param orientation    {string}                  enum: none, portrait, landscape
         * @param metadata       {object}                  
         * @param viewCount      {number}                  default: 0  format: double  
         * @param downloadCount  {number}                  default: 0  format: double  
         * @param shareCount     {number}                  default: 0  format: double  
         * @param frameRate      {number}                  default: 0  format: double  
         * @param duration       {number}                  default: 0  format: double  
         * @param rotation       {number}                  default: 0  format: double  
         * @param published      {string}                  format: date-time  
         * @param created        {string}                  format: date-time  
         * @param modified       {string}                  format: date-time  
         * @param assetCreated   {string}                  format: date-time  
         * @param rollbackFromId {string}                  
         * @param id             {string}                  
         * @param termsId        {string}                  
         * @param assetId        {string}                  
         * @param teamId         {string}                  
         * @param uploaderId     {string}                  
         * @param tags           {array}                   items: $ref: #/definitions/Tag    
         * @param categories     {array}                   items: $ref: #/definitions/AssetCategory    
         * @param options        {array}                   items: $ref: #/definitions/AssetOption    
         * @param comments       {array}                   items: $ref: #/definitions/AssetComment    
         * @param events         {array}                   items: $ref: #/definitions/AssetEvent    
         * @param collections    {array}                   items: $ref: #/definitions/AssetCollection    
         * @param terms          {object}                  $ref: #/definitions/AssetTerms  
         * @param uploader       {object}                  $ref: #/definitions/TeamMember  
         * @param team           {object}                  $ref: #/definitions/Team  
         * @param asset          {object}                  $ref: #/definitions/Asset  
         */
        function TweakAssetVersion(data) {
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
        var parameters = ['publicId', 'secureUrl', 'resourceType', 'type', 'etag', 'format', 'bytes', 'description', 'status', 'thumbnailUrl', 'version', 'versionNumber', 'signature', 'placeholder', 'width', 'height', 'pages', 'bitRate', 'path', 'orientation', 'metadata', 'viewCount', 'downloadCount', 'shareCount', 'frameRate', 'duration', 'rotation', 'published', 'created', 'modified', 'assetCreated', 'rollbackFromId', 'id', 'termsId', 'assetId', 'teamId', 'uploaderId', 'tags', 'categories', 'options', 'comments', 'events', 'collections', 'terms', 'uploader', 'team', 'asset'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'number', 'string', 'string', 'string', 'number', 'number', 'string', 'string', 'number', 'number', 'number', 'number', 'string', 'string', 'object', 'number', 'number', 'number', 'number', 'number', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'array', 'array', 'array', 'array', 'object', 'object', 'object', 'object'];
        var requiredParameters = ['publicId', 'secureUrl', 'resourceType', 'type', 'etag', 'bytes', 'status'];

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
        TweakAssetVersion.build = function (data) {
            return new TweakAssetVersion(data);
        };

        TweakAssetVersion.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetVersion.build).filter(Boolean);
            }
            return TweakAssetVersion.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetVersion;
    }
})();