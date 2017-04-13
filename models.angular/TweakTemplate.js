(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplate', TweakTemplate);

    TweakTemplate.$inject = ['$log'];

    function TweakTemplate($log) {

        /**
         * Constructor, with class name
         * @param name       {string}    [REQUIRED]    
         * @param thumbnail  {string}                  
         * @param created    {string}                  format: date-time  
         * @param modified   {string}                  format: date-time  
         * @param id         {number}                  format: double  
         * @param teamId     {string}                  
         * @param memberId   {number}                  format: double  
         * @param portals    {array}                   items: type: object    
         * @param team       {object}                  
         * @param members    {array}                   items: type: object    
         * @param permission {object}                  
         * @param designs    {array}                   items: type: object    
         * @param tags       {array}                   items: type: object    
         */
        function TweakTemplate(name, thumbnail, created, modified, id, teamId, memberId, portals, team, members, permission, designs, tags) {
            this.name = name;
            this.thumbnail = thumbnail;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.teamId = teamId;
            this.memberId = memberId;
            this.portals = portals;
            this.team = team;
            this.members = members;
            this.permission = permission;
            this.designs = designs;
            this.tags = tags;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'thumbnail', 'created', 'modified', 'id', 'teamId', 'memberId', 'portals', 'team', 'members', 'permission', 'designs', 'tags'];
        var parametersType = ['string', 'string', 'string', 'string', 'number', 'string', 'number', 'array', 'object', 'array', 'object', 'array', 'array'];
        var requiredParameters = ['name'];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error("Required parameter '" + requiredParameter + "' is missing!");
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error("Wrong parameter type for '" + parameters[i] + "': should be '" + parametersType[i] + "'!");
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakTemplate.build = function (data) {
            return new TweakTemplate(
                data.name,
                data.thumbnail,
                data.created,
                data.modified,
                data.id,
                data.teamId,
                data.memberId,
                data.portals,
                data.team,
                data.members,
                data.permission,
                data.designs,
                data.tags
            );
        };

        TweakTemplate.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplate.build).filter(Boolean);
            }
            return TweakTemplate.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplate;
    }
})();