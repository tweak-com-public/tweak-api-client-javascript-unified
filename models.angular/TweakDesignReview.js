(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignReview', TweakDesignReview);

    TweakDesignReview.$inject = ['$log'];

    function TweakDesignReview($log) {

        /**
         * Constructor, with class name
         * @param status     {string}    default: pending  enum: pending, reviewed
         * @param id         {number}    format: double  
         * @param designId   {number}    format: double  
         * @param reviewerId {number}    format: double  
         * @param design     {string}    $ref: #/definitions/Design  
         * @param reviewer   {string}    $ref: #/definitions/PortalMember  
         */
        function TweakDesignReview(status, id, designId, reviewerId, design, reviewer) {
            this.status = status;
            this.id = id;
            this.designId = designId;
            this.reviewerId = reviewerId;
            this.design = design;
            this.reviewer = reviewer;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['status', 'id', 'designId', 'reviewerId', 'design', 'reviewer'];
        var parametersType = ['string', 'number', 'number', 'number', 'string', 'string'];
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
        TweakDesignReview.build = function (data) {
            return new TweakDesignReview(
                data.status,
                data.id,
                data.designId,
                data.reviewerId,
                data.design,
                data.reviewer
            );
        };

        TweakDesignReview.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignReview.build).filter(Boolean);
            }
            return TweakDesignReview.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignReview;
    }
})();