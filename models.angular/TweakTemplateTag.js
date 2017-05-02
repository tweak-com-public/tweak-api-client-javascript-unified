(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplateTag', TweakTemplateTag);

    TweakTemplateTag.$inject = ['$log'];

    function TweakTemplateTag($log) {

        /**
         * Constructor, with class name
         * @param id         {number}    format: double  
         * @param tagId      {number}    format: double  
         * @param templateId {number}    format: double  
         * @param tag        {string}    $ref: #/definitions/Tag  
         * @param template   {string}    $ref: #/definitions/Template  
         */
        function TweakTemplateTag(id, tagId, templateId, tag, template) {
            this.id = id;
            this.tagId = tagId;
            this.templateId = templateId;
            this.tag = tag;
            this.template = template;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'tagId', 'templateId', 'tag', 'template'];
        var parametersType = ['number', 'number', 'number', 'string', 'string'];
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
        TweakTemplateTag.build = function (data) {
            return new TweakTemplateTag(
                data.id,
                data.tagId,
                data.templateId,
                data.tag,
                data.template
            );
        };

        TweakTemplateTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplateTag.build).filter(Boolean);
            }
            return TweakTemplateTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplateTag;
    }
})();