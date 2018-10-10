(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeam', TweakTeam);

    TweakTeam.$inject = ['$log'];

    function TweakTeam($log) {

        /**
         * Constructor, with class name
         * @param name                    {string}    [REQUIRED]    
         * @param isLegacyPartner         {boolean}                 default: false  
         * @param logo                    {object}                  default:   $ref: #/definitions/CloudinaryImage  
         * @param subdomain               {string}                  
         * @param country                 {string}                  default: Ireland  
         * @param featureHtmlBuilder      {boolean}                 default: false  
         * @param created                 {string}                  format: date-time  
         * @param modified                {string}                  format: date-time  
         * @param id                      {string}    [REQUIRED]    
         * @param icon                    {string}                  description: The icon image url  
         * @param clientKey               {string}                  
         * @param javaScriptKey           {string}                  
         * @param restApiKey              {string}                  
         * @param windowsKey              {string}                  
         * @param masterKey               {string}                  
         * @param status                  {string}                  default: sandbox  description: Status of the application, production/sandbox/disabled  
         * @param teamDataId              {string}                  
         * @param members                 {array}                   items: $ref: #/definitions/Customer    
         * @param builderConfigs          {array}                   items: $ref: #/definitions/TeamBuilderConfig    
         * @param dynamicDatas            {array}                   items: $ref: #/definitions/DynamicData    
         * @param dataSourceSoaps         {array}                   items: $ref: #/definitions/DataSourceSoap    
         * @param dataSourceRests         {array}                   items: $ref: #/definitions/DataSourceRest    
         * @param teamMembers             {array}                   items: $ref: #/definitions/TeamMember    
         * @param portals                 {array}                   items: $ref: #/definitions/Portal    
         * @param templates               {array}                   items: $ref: #/definitions/Template    
         * @param brand                   {object}                  $ref: #/definitions/TeamBrand  
         * @param templateFolders         {array}                   items: $ref: #/definitions/TeamTemplateFolder    
         * @param workflows               {array}                   items: $ref: #/definitions/Workflow    
         * @param images                  {array}                   items: $ref: #/definitions/Image    
         * @param imageFolders            {array}                   items: $ref: #/definitions/ImageFolder    
         * @param billing                 {object}                  $ref: #/definitions/Billing  
         * @param permission              {object}                  $ref: #/definitions/TeamPermissionSet  
         * @param productMaterials        {array}                   items: $ref: #/definitions/ProductMaterial    
         * @param productSizeMaterials    {array}                   items: $ref: #/definitions/ProductSizeMaterial    
         * @param productPdfColorProfiles {array}                   items: $ref: #/definitions/ProductPdfColorProfile    
         * @param teamData                {object}                  $ref: #/definitions/DynamicData  
         * @param assets                  {array}                   items: $ref: #/definitions/Asset    
         * @param terms                   {array}                   items: $ref: #/definitions/AssetTerms    
         * @param assetCategories         {array}                   items: $ref: #/definitions/AssetCategory    
         * @param tags                    {array}                   items: $ref: #/definitions/Tag    
         * @param assetCollections        {array}                   items: $ref: #/definitions/AssetCollection    
         * @param assetChannels           {array}                   items: $ref: #/definitions/AssetChannel    
         * @param fonts                   {array}                   items: $ref: #/definitions/TeamFont    
         * @param config                  {object}                  $ref: #/definitions/TeamConfig  
         * @param godConfig               {object}                  $ref: #/definitions/TeamGodConfig  
         */
        function TweakTeam(data) {
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
        var parameters = ['name', 'isLegacyPartner', 'logo', 'subdomain', 'country', 'featureHtmlBuilder', 'created', 'modified', 'id', 'icon', 'clientKey', 'javaScriptKey', 'restApiKey', 'windowsKey', 'masterKey', 'status', 'teamDataId', 'members', 'builderConfigs', 'dynamicDatas', 'dataSourceSoaps', 'dataSourceRests', 'teamMembers', 'portals', 'templates', 'brand', 'templateFolders', 'workflows', 'images', 'imageFolders', 'billing', 'permission', 'productMaterials', 'productSizeMaterials', 'productPdfColorProfiles', 'teamData', 'assets', 'terms', 'assetCategories', 'tags', 'assetCollections', 'assetChannels', 'fonts', 'config', 'godConfig'];
        var parametersType = ['string', 'boolean', 'object', 'string', 'string', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'array', 'object', 'object', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'object', 'object'];
        var requiredParameters = ['name', 'id'];

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
        TweakTeam.build = function (data) {
            return new TweakTeam(data);
        };

        TweakTeam.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeam.build).filter(Boolean);
            }
            return TweakTeam.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeam;
    }
})();