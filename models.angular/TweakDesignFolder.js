(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignFolder', TweakDesignFolder);

    TweakDesignFolder.$inject = ['$log'];

    function TweakDesignFolder($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param path     {string}                  default: /  
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param memberId {string}                  
         * @param parentId {string}                  
         * @param portalId {string}                  
         * @param member   {object}                  $ref: #/definitions/TeamMember  
         * @param children {array}                   items: $ref: #/definitions/DesignFolder    
         * @param parent   {object}                  $ref: #/definitions/DesignFolder  
         * @param designs  {array}                   items: $ref: #/definitions/Design    
         * @param portal   {object}                  $ref: #/definitions/Portal  
         */
        function TweakDesignFolder(data) {
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
        var parameters = ['name', 'path', 'created', 'modified', 'id', 'memberId', 'parentId', 'portalId', 'member', 'children', 'parent', 'designs', 'portal'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object', 'array', 'object'];
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
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakDesignFolder.build = function (data) {
            return new TweakDesignFolder(data);
        };

        TweakDesignFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignFolder.build).filter(Boolean);
            }
            return TweakDesignFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignFolder;
    }
})();