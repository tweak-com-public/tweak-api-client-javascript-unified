(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamFont', TweakTeamFont);

    TweakTeamFont.$inject = ['$log'];

    function TweakTeamFont($log) {

        /**
         * Constructor, with class name
         * @param gen        {string}    [REQUIRED]    
         * @param postScript {string}    [REQUIRED]    
         * @param fileName   {string}    [REQUIRED]    
         * @param extension  {string}    [REQUIRED]    
         * @param fontBase   {string}    [REQUIRED]    
         * @param fontStyle  {string}                  
         * @param ascent12   {number}                  format: double  
         * @param descent12  {number}                  format: double  
         * @param remoteURL  {string}                  
         * @param created    {string}                  format: date-time  
         * @param modified   {string}                  format: date-time  
         * @param id         {string}                  
         * @param teamId     {string}                  
         * @param team       {object}                  $ref: #/definitions/Team  
         */
        function TweakTeamFont(data) {
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
        var parameters = ['gen', 'postScript', 'fileName', 'extension', 'fontBase', 'fontStyle', 'ascent12', 'descent12', 'remoteURL', 'created', 'modified', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'number', 'number', 'string', 'string', 'string', 'string', 'string', 'object'];
        var requiredParameters = ['gen', 'postScript', 'fileName', 'extension', 'fontBase'];

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
        TweakTeamFont.build = function (data) {
            return new TweakTeamFont(data);
        };

        TweakTeamFont.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamFont.build).filter(Boolean);
            }
            return TweakTeamFont.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamFont;
    }
})();