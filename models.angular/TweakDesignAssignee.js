(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignAssignee', TweakDesignAssignee);

    TweakDesignAssignee.$inject = ['$log'];

    function TweakDesignAssignee($log) {

        /**
         * Constructor, with class name
         * @param id         {number}    format: double  
         * @param designId   {number}    format: double  
         * @param assigneeId {number}    format: double  
         * @param design     {object}    
         * @param assignee   {object}    
         */
        function TweakDesignAssignee(id, designId, assigneeId, design, assignee) {
            this.id = id;
            this.designId = designId;
            this.assigneeId = assigneeId;
            this.design = design;
            this.assignee = assignee;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'designId', 'assigneeId', 'design', 'assignee'];
        var parametersType = ['number', 'number', 'number', 'object', 'object'];
        var requiredParameters = [];

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
        TweakDesignAssignee.build = function (data) {
            return new TweakDesignAssignee(
                data.id,
                data.designId,
                data.assigneeId,
                data.design,
                data.assignee
            );
        };

        TweakDesignAssignee.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignAssignee.build).filter(Boolean);
            }
            return TweakDesignAssignee.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignAssignee;
    }
})();