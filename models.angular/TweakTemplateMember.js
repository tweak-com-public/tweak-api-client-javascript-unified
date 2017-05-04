(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplateMember', TweakTemplateMember);

    TweakTemplateMember.$inject = ['$log'];

    function TweakTemplateMember($log) {

        /**
         * Constructor, with class name
         * @param uploader   {boolean}   
         * @param viewOnly   {boolean}   
         * @param id         {string}    
         * @param templateId {string}    
         * @param memberId   {string}    
         * @param template   {string}    $ref: #/definitions/Template  
         * @param member     {string}    $ref: #/definitions/TeamMember  
         */
        function TweakTemplateMember(uploader, viewOnly, id, templateId, memberId, template, member) {
            this.uploader = uploader;
            this.viewOnly = viewOnly;
            this.id = id;
            this.templateId = templateId;
            this.memberId = memberId;
            this.template = template;
            this.member = member;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['uploader', 'viewOnly', 'id', 'templateId', 'memberId', 'template', 'member'];
        var parametersType = ['boolean', 'boolean', 'string', 'string', 'string', 'string', 'string'];
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
        TweakTemplateMember.build = function (data) {
            return new TweakTemplateMember(
                data.uploader,
                data.viewOnly,
                data.id,
                data.templateId,
                data.memberId,
                data.template,
                data.member
            );
        };

        TweakTemplateMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplateMember.build).filter(Boolean);
            }
            return TweakTemplateMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplateMember;
    }
})();