(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakCustomer', TweakCustomer);

    TweakCustomer.$inject = ['$log'];

    function TweakCustomer($log) {

        /**
         * Constructor, with class name
         * @param profilePicture    {string}                  
         * @param firstName         {string}    [REQUIRED]    
         * @param lastName          {string}    [REQUIRED]    
         * @param initials          {string}    [REQUIRED]    minimum: 2  maximum: 2  
         * @param status            {string}                  default: active  enum: active, inactive, godmode
         * @param created           {string}                  format: date-time  
         * @param modified          {string}                  format: date-time  
         * @param realm             {string}                  
         * @param username          {string}                  
         * @param email             {string}    [REQUIRED]    
         * @param emailVerified     {boolean}                 
         * @param id                {string}                  
         * @param designs           {array}                   items: $ref: #/definitions/Design    
         * @param teams             {array}                   items: $ref: #/definitions/Team    
         * @param invitationTickets {array}                   items: $ref: #/definitions/InvitationTicket    
         * @param accessTokens      {array}                   items: $ref: #/definitions/TeamMemberAccessToken    
         * @param permission        {object}                  $ref: #/definitions/CustomerPermissionSet  
         */
        function TweakCustomer(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['profilePicture', 'firstName', 'lastName', 'initials', 'status', 'created', 'modified', 'realm', 'username', 'email', 'emailVerified', 'id', 'designs', 'teams', 'invitationTickets', 'accessTokens', 'permission'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'boolean', 'string', 'array', 'array', 'array', 'array', 'object'];
        var requiredParameters = ['firstName', 'lastName', 'initials', 'email'];

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
        TweakCustomer.build = function (data) {
            return new TweakCustomer(data);
        };

        TweakCustomer.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakCustomer.build).filter(Boolean);
            }
            return TweakCustomer.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakCustomer;
    }
})();