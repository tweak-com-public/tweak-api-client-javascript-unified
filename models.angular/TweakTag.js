(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTag', TweakTag);

    TweakTag.$inject = ['$log'];

    function TweakTag($log) {

        /**
         * Constructor, with class name
         * @param name      {string}    [REQUIRED]    
         * @param created   {string}                  format: date-time  
         * @param modified  {string}                  format: date-time  
         * @param id        {number}                  format: double  
         * @param templates {array}                   items: type: object    
         * @param designs   {array}                   items: type: object    
         */
        function TweakTag(name, created, modified, id, templates, designs) {
            this.name = name;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.templates = templates;
            this.designs = designs;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'created', 'modified', 'id', 'templates', 'designs'];
        var parametersType = ['string', 'string', 'string', 'number', 'array', 'array'];
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
        TweakTag.build = function (data) {
            return new TweakTag(
                data.name,
                data.created,
                data.modified,
                data.id,
                data.templates,
                data.designs
            );
        };

        TweakTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTag.build).filter(Boolean);
            }
            return TweakTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTag;
    }
})();