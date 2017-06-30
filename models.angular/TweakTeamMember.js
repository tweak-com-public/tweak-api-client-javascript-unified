(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMember', TweakTeamMember);

    TweakTeamMember.$inject = ['$log'];

    function TweakTeamMember($log) {

        /**
         * Constructor, with class name
         * @param roles                  {array}     [REQUIRED]    default: items: type: string    
         * @param position               {string}                  
         * @param officePhone            {string}                  
         * @param mobilePhone            {string}                  
         * @param website                {string}                  
         * @param created                {string}                  format: date-time  
         * @param modified               {string}                  format: date-time  
         * @param id                     {string}                  
         * @param customerId             {string}                  
         * @param teamId                 {string}                  
         * @param customer               {object}                  $ref: #/definitions/Customer  
         * @param team                   {object}                  $ref: #/definitions/Team  
         * @param portals                {array}                   items: $ref: #/definitions/Portal    
         * @param uploadedTemplates      {array}                   items: $ref: #/definitions/Template    
         * @param templates              {array}                   items: $ref: #/definitions/Template    
         * @param invitationTickets      {array}                   items: $ref: #/definitions/InvitationTicket    
         * @param requestedDesigns       {array}                   items: $ref: #/definitions/Design    
         * @param requestedDesignExports {array}                   items: $ref: #/definitions/DesignExport    
         * @param assignedDesigns        {array}                   items: $ref: #/definitions/Design    
         * @param reviewedDesigns        {array}                   items: $ref: #/definitions/Design    
         * @param commentedDesigns       {array}                   items: $ref: #/definitions/Design    
         * @param designComments         {array}                   items: $ref: #/definitions/DesignComment    
         * @param designFolders          {array}                   items: $ref: #/definitions/DesignFolder    
         * @param workflows              {array}                   items: $ref: #/definitions/Workflow    
         * @param imageFolders           {array}                   items: $ref: #/definitions/ImageFolder    
         */
        function TweakTeamMember(data) {
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
        var parameters = ['roles', 'position', 'officePhone', 'mobilePhone', 'website', 'created', 'modified', 'id', 'customerId', 'teamId', 'customer', 'team', 'portals', 'uploadedTemplates', 'templates', 'invitationTickets', 'requestedDesigns', 'requestedDesignExports', 'assignedDesigns', 'reviewedDesigns', 'commentedDesigns', 'designComments', 'designFolders', 'workflows', 'imageFolders'];
        var parametersType = ['array', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array', 'array'];
        var requiredParameters = ['roles'];

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
        TweakTeamMember.build = function (data) {
            return new TweakTeamMember(data);
        };

        TweakTeamMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamMember.build).filter(Boolean);
            }
            return TweakTeamMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamMember;
    }
})();