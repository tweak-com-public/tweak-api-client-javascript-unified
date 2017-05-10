(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakWorkflow', TweakWorkflow);

    TweakWorkflow.$inject = ['$log'];

    function TweakWorkflow($log) {

        /**
         * Constructor, with class name
         * @param name      {string}    [REQUIRED]    
         * @param form      {object}    [REQUIRED]    
         * @param edited    {string}                  format: date-time  
         * @param created   {string}                  format: date-time  
         * @param modified  {string}                  format: date-time  
         * @param id        {string}                  
         * @param teamId    {string}                  
         * @param creatorId {string}                  
         * @param team      {object}                  $ref: #/definitions/Team  
         * @param templates {array}                   items: $ref: #/definitions/Template    
         * @param creator   {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakWorkflow(name, form, edited, created, modified, id, teamId, creatorId, team, templates, creator) {
            this.name = name;
            this.form = form;
            this.edited = edited;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.teamId = teamId;
            this.creatorId = creatorId;
            this.team = team;
            this.templates = templates;
            this.creator = creator;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'form', 'edited', 'created', 'modified', 'id', 'teamId', 'creatorId', 'team', 'templates', 'creator'];
        var parametersType = ['string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object'];
        var requiredParameters = ['name', 'form'];

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
        TweakWorkflow.build = function (data) {
            return new TweakWorkflow(
                data.name,
                data.form,
                data.edited,
                data.created,
                data.modified,
                data.id,
                data.teamId,
                data.creatorId,
                data.team,
                data.templates,
                data.creator
            );
        };

        TweakWorkflow.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakWorkflow.build).filter(Boolean);
            }
            return TweakWorkflow.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakWorkflow;
    }
})();