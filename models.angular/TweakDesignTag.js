(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignTag', TweakDesignTag);

    TweakDesignTag.$inject = ['$log'];

    function TweakDesignTag($log) {

        /**
         * Constructor, with class name
         * @param id       {number}    format: double  
         * @param designId {number}    format: double  
         * @param tagId    {number}    format: double  
         * @param design   {string}    $ref: #/definitions/Design  
         * @param tag      {string}    $ref: #/definitions/Tag  
         */
        function TweakDesignTag(id, designId, tagId, design, tag) {
            this.id = id;
            this.designId = designId;
            this.tagId = tagId;
            this.design = design;
            this.tag = tag;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'designId', 'tagId', 'design', 'tag'];
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
        TweakDesignTag.build = function (data) {
            return new TweakDesignTag(
                data.id,
                data.designId,
                data.tagId,
                data.design,
                data.tag
            );
        };

        TweakDesignTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignTag.build).filter(Boolean);
            }
            return TweakDesignTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignTag;
    }
})();