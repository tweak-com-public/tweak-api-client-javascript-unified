(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignExport', TweakDesignExport);

    TweakDesignExport.$inject = ['$log'];

    function TweakDesignExport($log) {

        /**
         * Constructor, with class name
         * @param type        {string}    [REQUIRED]    enum: proof, pdf
         * @param created     {string}                  format: date-time  
         * @param id          {number}                  format: double  
         * @param designId    {number}                  format: double  
         * @param requesterId {number}                  format: double  
         * @param designs     {string}                  $ref: #/definitions/Design  
         * @param requester   {string}                  $ref: #/definitions/TeamMember  
         */
        function TweakDesignExport(type, created, id, designId, requesterId, designs, requester) {
            this.type = type;
            this.created = created;
            this.id = id;
            this.designId = designId;
            this.requesterId = requesterId;
            this.designs = designs;
            this.requester = requester;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['type', 'created', 'id', 'designId', 'requesterId', 'designs', 'requester'];
        var parametersType = ['string', 'string', 'number', 'number', 'number', 'string', 'string'];
        var requiredParameters = ['type'];

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
        TweakDesignExport.build = function (data) {
            return new TweakDesignExport(
                data.type,
                data.created,
                data.id,
                data.designId,
                data.requesterId,
                data.designs,
                data.requester
            );
        };

        TweakDesignExport.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignExport.build).filter(Boolean);
            }
            return TweakDesignExport.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignExport;
    }
})();