(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakImageFolderMember', TweakImageFolderMember);

    TweakImageFolderMember.$inject = ['$log'];

    function TweakImageFolderMember($log) {

        /**
         * Constructor, with class name
         * @param created  {string}    format: date-time  
         * @param modified {string}    format: date-time  
         * @param id       {string}    
         * @param memberId {string}    
         * @param folderId {string}    
         * @param member   {object}    $ref: #/definitions/TeamMember  
         * @param folder   {object}    $ref: #/definitions/ImageFolder  
         */
        function TweakImageFolderMember(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['created', 'modified', 'id', 'memberId', 'folderId', 'member', 'folder'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'object'];
        var requiredParameters = [];

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
        TweakImageFolderMember.build = function (data) {
            return new TweakImageFolderMember(data);
        };

        TweakImageFolderMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakImageFolderMember.build).filter(Boolean);
            }
            return TweakImageFolderMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakImageFolderMember;
    }
})();