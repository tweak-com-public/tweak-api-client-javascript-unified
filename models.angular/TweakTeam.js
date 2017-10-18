(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeam', TweakTeam);

    TweakTeam.$inject = ['$log'];

    function TweakTeam($log) {

        /**
         * Constructor, with class name
         * @param name            {string}    [REQUIRED]    
         * @param logo            {object}                  default:   
         * @param subdomain       {string}                  
         * @param country         {string}                  default: Ireland  
         * @param created         {string}                  format: date-time  
         * @param modified        {string}                  format: date-time  
         * @param id              {string}    [REQUIRED]    
         * @param icon            {string}                  description: The icon image url  
         * @param clientKey       {string}                  
         * @param javaScriptKey   {string}                  
         * @param restApiKey      {string}                  
         * @param windowsKey      {string}                  
         * @param masterKey       {string}                  
         * @param status          {string}                  default: sandbox  description: Status of the application, production/sandbox/disabled  
         * @param members         {array}                   items: $ref: #/definitions/Customer    
         * @param dataSources     {array}                   items: $ref: #/definitions/DataSource    
         * @param dynamicDatas    {array}                   items: $ref: #/definitions/DynamicData    
         * @param teamMembers     {array}                   items: $ref: #/definitions/TeamMember    
         * @param portals         {array}                   items: $ref: #/definitions/Portal    
         * @param templates       {array}                   items: $ref: #/definitions/Template    
         * @param brand           {object}                  $ref: #/definitions/TeamBrand  
         * @param templateFolders {array}                   items: $ref: #/definitions/TeamTemplateFolder    
         * @param workflows       {array}                   items: $ref: #/definitions/Workflow    
         * @param images          {array}                   items: $ref: #/definitions/Image    
         * @param imageFolders    {array}                   items: $ref: #/definitions/ImageFolder    
         * @param billing         {object}                  $ref: #/definitions/Billing  
         * @param permission      {object}                  $ref: #/definitions/TeamPermissionSet  
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
        var parameters = ['name', 'logo', 'subdomain', 'country', 'created', 'modified', 'id', 'icon', 'clientKey', 'javaScriptKey', 'restApiKey', 'windowsKey', 'masterKey', 'status', 'members', 'dataSources', 'dynamicDatas', 'teamMembers', 'portals', 'templates', 'brand', 'templateFolders', 'workflows', 'images', 'imageFolders', 'billing', 'permission'];
        var parametersType = ['string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'array', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'array', 'object', 'object'];
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