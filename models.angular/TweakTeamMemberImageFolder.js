(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMemberImageFolder', TweakTeamMemberImageFolder);

    TweakTeamMemberImageFolder.$inject = ['$log'];

    function TweakTeamMemberImageFolder($log) {

        /**
         * Constructor, with class name
         * @param id       {string}    
         * @param memberId {string}    
         * @param folderId {string}    
         * @param member   {object}    $ref: #/definitions/TeamMember  
         * @param folder   {object}    $ref: #/definitions/ImageFolder  
         */
        function TweakTeamMemberImageFolder(id, memberId, folderId, member, folder) {
            this.id = id;
            this.memberId = memberId;
            this.folderId = folderId;
            this.member = member;
            this.folder = folder;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'memberId', 'folderId', 'member', 'folder'];
        var parametersType = ['string', 'string', 'string', 'object', 'object'];
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
        TweakTeamMemberImageFolder.build = function (data) {
            return new TweakTeamMemberImageFolder(
                data.id,
                data.memberId,
                data.folderId,
                data.member,
                data.folder
            );
        };

        TweakTeamMemberImageFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamMemberImageFolder.build).filter(Boolean);
            }
            return TweakTeamMemberImageFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamMemberImageFolder;
    }
})();