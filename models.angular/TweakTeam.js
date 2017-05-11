(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeam', TweakTeam);

    TweakTeam.$inject = ['$log'];

    function TweakTeam($log) {

        /**
         * Constructor, with class name
         * @param name            {string}    [REQUIRED]    
         * @param logo            {string}                  
         * @param subdomain       {string}                  
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
         * @param teamMembers     {array}                   items: $ref: #/definitions/TeamMember    
         * @param portals         {array}                   items: $ref: #/definitions/Portal    
         * @param templates       {array}                   items: $ref: #/definitions/Template    
         * @param brand           {object}                  $ref: #/definitions/TeamBrand  
         * @param templateFolders {array}                   items: $ref: #/definitions/TeamTemplateFolder    
         * @param workflows       {array}                   items: $ref: #/definitions/Workflow    
         * @param images          {array}                   items: $ref: #/definitions/Image    
         * @param imageFolders    {array}                   items: $ref: #/definitions/ImageFolder    
         */
        function TweakTeam(name, logo, subdomain, created, modified, id, icon, clientKey, javaScriptKey, restApiKey, windowsKey, masterKey, status, members, teamMembers, portals, templates, brand, templateFolders, workflows, images, imageFolders) {
            this.name = name;
            this.logo = logo;
            this.subdomain = subdomain;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.icon = icon;
            this.clientKey = clientKey;
            this.javaScriptKey = javaScriptKey;
            this.restApiKey = restApiKey;
            this.windowsKey = windowsKey;
            this.masterKey = masterKey;
            this.status = status;
            this.members = members;
            this.teamMembers = teamMembers;
            this.portals = portals;
            this.templates = templates;
            this.brand = brand;
            this.templateFolders = templateFolders;
            this.workflows = workflows;
            this.images = images;
            this.imageFolders = imageFolders;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'logo', 'subdomain', 'created', 'modified', 'id', 'icon', 'clientKey', 'javaScriptKey', 'restApiKey', 'windowsKey', 'masterKey', 'status', 'members', 'teamMembers', 'portals', 'templates', 'brand', 'templateFolders', 'workflows', 'images', 'imageFolders'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'array', 'array', 'object', 'array', 'array', 'array', 'array'];
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
            return new TweakTeam(
                data.name,
                data.logo,
                data.subdomain,
                data.created,
                data.modified,
                data.id,
                data.icon,
                data.clientKey,
                data.javaScriptKey,
                data.restApiKey,
                data.windowsKey,
                data.masterKey,
                data.status,
                data.members,
                data.teamMembers,
                data.portals,
                data.templates,
                data.brand,
                data.templateFolders,
                data.workflows,
                data.images,
                data.imageFolders
            );
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