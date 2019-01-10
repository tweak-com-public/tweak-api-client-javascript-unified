(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSource', TweakBillingSource);

    TweakBillingSource.$inject = ['$log'];

    function TweakBillingSource($log) {

        /**
         * Constructor, with class name
         * @param id                  {string}    
         * @param object              {string}    default: source  
         * @param amount              {number}    format: double  
         * @param clientSecret        {string}    
         * @param created             {number}    format: double  
         * @param currency            {string}    
         * @param flow                {string}    
         * @param livemode            {boolean}   
         * @param owner               {object}    $ref: #/definitions/BillingSourceOwner  
         * @param receiver            {object}    $ref: #/definitions/BillingSourceReceiver  
         * @param statementDescriptor {string}    
         * @param status              {string}    
         * @param type                {string}    enum: sepa_debit, sofort
         * @param usage               {string}    
         * @param achCreditTransfer   {object}    $ref: #/definitions/BillingSourceAchCreditTransfer  
         * @param sepaDebit           {object}    $ref: #/definitions/BillingSourceSepaDebit  
         * @param sofort              {object}    $ref: #/definitions/BillingSourceSofort  
         * @param redirect            {object}    $ref: #/definitions/BillingSourceRedirect  
         * @param token               {string}    
         */
        function TweakBillingSource(data) {
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
        var parameters = ['id', 'object', 'amount', 'clientSecret', 'created', 'currency', 'flow', 'livemode', 'owner', 'receiver', 'statementDescriptor', 'status', 'type', 'usage', 'achCreditTransfer', 'sepaDebit', 'sofort', 'redirect', 'token'];
        var parametersType = ['string', 'string', 'number', 'string', 'number', 'string', 'string', 'boolean', 'object', 'object', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object', 'string'];
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
        TweakBillingSource.build = function (data) {
            return new TweakBillingSource(data);
        };

        TweakBillingSource.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSource.build).filter(Boolean);
            }
            return TweakBillingSource.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSource;
    }
})();