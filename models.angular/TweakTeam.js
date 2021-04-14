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
         * @param featureHtmlBuilder      {boolean}                 default: true  
         * @param legacyProductLanguage   {string}                  default: en  
         * @param legacySizeType          {string}                  default: mm  
         * @param psKeysGenerated         {string}                  format: date-time  
         * @param publicApiVersion        {string}                  default: v2  
         * @param products                {array}                   items: type: string    
         * @param newDAM                  {object}                  
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
         * @param imageFolders            {array}                   items: $ref: #/definitions/ImageFolder    
         * @param billing                 {object}                  $ref: #/definitions/Billing  
         * @param billingV2               {object}                  $ref: #/definitions/BillingV2  
         * @param permission              {object}                  $ref: #/definitions/TeamPermissionSet  
         * @param productMaterials        {array}                   items: $ref: #/definitions/ProductMaterial    
         * @param productSizeMaterials    {array}                   items: $ref: #/definitions/ProductSizeMaterial    
         * @param productPdfColorProfiles {array}                   items: $ref: #/definitions/ProductPdfColorProfile    
         * @param teamData                {object}                  $ref: #/definitions/DynamicData  
         * @param assets                  {array}                   items: $ref: #/definitions/Asset    
         * @param tags                    {array}                   items: $ref: #/definitions/Tag    
         * @param assetCollections        {array}                   items: $ref: #/definitions/AssetCollection    
         * @param assetUploads            {array}                   items: $ref: #/definitions/AssetUpload    
         * @param fonts                   {array}                   items: $ref: #/definitions/TeamFont    
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
        var parameters = ['name', 'isLegacyPartner', 'logo', 'subdomain', 'country', 'featureHtmlBuilder', 'legacyProductLanguage', 'legacySizeType', 'psKeysGenerated', 'publicApiVersion', 'products', 'newDAM', 'created', 'modified', 'id', 'icon', 'clientKey', 'javaScriptKey', 'restApiKey', 'windowsKey', 'masterKey', 'status', 'teamDataId', 'members', 'builderConfigs', 'dynamicDatas', 'dataSourceSoaps', 'dataSourceRests', 'teamMembers', 'portals', 'templates', 'brand', 'templateFolders', 'workflows', 'imageFolders', 'billing', 'billingV2', 'permission', 'productMaterials', 'productSizeMaterials', 'productPdfColorProfiles', 'teamData', 'assets', 'tags', 'assetCollections', 'assetUploads', 'fonts'];
        var parametersType = ['string', 'boolean', 'object', 'string', 'string', 'boolean', 'string', 'string', 'string', 'string', 'array', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'object', 'object', 'object', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'array', 'array'];
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