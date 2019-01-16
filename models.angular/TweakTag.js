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
         * @param id        {string}                  
         * @param teamId    {string}                  
         * @param team      {object}                  $ref: #/definitions/Team  
         * @param templates {array}                   items: $ref: #/definitions/Template    
         * @param designs   {array}                   items: $ref: #/definitions/Design    
         * @param products  {array}                   items: $ref: #/definitions/Product    
         * @param assets    {array}                   items: $ref: #/definitions/Asset    
         */
        function TweakTag(data) {
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
        var parameters = ['name', 'created', 'modified', 'id', 'teamId', 'team', 'templates', 'designs', 'products', 'assets'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'array', 'array'];
        var requiredParameters = ['name'];

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
        TweakTag.build = function (data) {
            return new TweakTag(data);
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