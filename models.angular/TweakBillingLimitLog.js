(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimitLog', TweakBillingLimitLog);

    TweakBillingLimitLog.$inject = ['$log'];

    function TweakBillingLimitLog($log) {

        /**
         * Constructor, with class name
         * @param value     {string}    [REQUIRED]    
         * @param operation {string}                  enum: increase, decrease
         * @param before    {object}                  $ref: #/definitions/BillingLimitCounter  
         * @param after     {object}                  $ref: #/definitions/BillingLimitCounter  
         * @param limit     {string}    [REQUIRED]    enum: teamMember, uploader, portal, jpeg, proof, highResPdf, storage, stockImageLibrary, productDbRecord, bandwidth, printerApi
         * @param message   {string}    [REQUIRED]    
         * @param created   {string}                  format: date-time  
         * @param modified  {string}                  format: date-time  
         * @param id        {string}                  
         * @param billingId {string}                  
         * @param billing   {object}                  $ref: #/definitions/Billing  
         */
        function TweakBillingLimitLog(data) {
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
        var parameters = ['value', 'operation', 'before', 'after', 'limit', 'message', 'created', 'modified', 'id', 'billingId', 'billing'];
        var parametersType = ['string', 'string', 'object', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'object'];
        var requiredParameters = ['value', 'limit', 'message'];

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
        TweakBillingLimitLog.build = function (data) {
            return new TweakBillingLimitLog(data);
        };

        TweakBillingLimitLog.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimitLog.build).filter(Boolean);
            }
            return TweakBillingLimitLog.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimitLog;
    }
})();