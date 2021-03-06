(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalMember', TweakPortalMember);

    TweakPortalMember.$inject = ['$log'];

    function TweakPortalMember($log) {

        /**
         * Constructor, with class name
         * @param roles    {array}     [REQUIRED]    default: items: type: string    
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param portalId {string}                  
         * @param memberId {string}                  
         * @param portal   {object}                  $ref: #/definitions/Portal  
         * @param member   {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakPortalMember(data) {
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
        var parameters = ['roles', 'created', 'modified', 'id', 'portalId', 'memberId', 'portal', 'member'];
        var parametersType = ['array', 'string', 'string', 'string', 'string', 'string', 'object', 'object'];
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
        TweakPortalMember.build = function (data) {
            return new TweakPortalMember(data);
        };

        TweakPortalMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalMember.build).filter(Boolean);
            }
            return TweakPortalMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalMember;
    }
})();