(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPublicV1Customer', TweakPublicV1Customer);

    TweakPublicV1Customer.$inject = ['$log'];

    function TweakPublicV1Customer($log) {

        /**
         * Constructor, with class name
         * @param id              {string}    
         * @param email           {string}    
         * @param isLegacyUser    {boolean}   
         * @param legacyUserToken {string}    
         * @param isAnonymous     {boolean}   
         * @param position        {string}    
         * @param officePhone     {string}    
         * @param mobilePhone     {string}    
         * @param website         {string}    
         * @param addressCity     {string}    
         * @param addressCountry  {string}    
         * @param addressLine1    {string}    
         * @param addressLine2    {string}    
         * @param addressState    {string}    
         * @param addressZip      {string}    
         * @param firstName       {string}    
         * @param lastName        {string}    
         * @param initials        {string}    minimum: 2  maximum: 2  
         * @param language        {string}    enum: en
         * @param timezone        {string}    enum: 
         * @param created         {string}    format: date-time  
         * @param modified        {string}    format: date-time  
         */
        function TweakPublicV1Customer(data) {
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
        var parameters = ['id', 'email', 'isLegacyUser', 'legacyUserToken', 'isAnonymous', 'position', 'officePhone', 'mobilePhone', 'website', 'addressCity', 'addressCountry', 'addressLine1', 'addressLine2', 'addressState', 'addressZip', 'firstName', 'lastName', 'initials', 'language', 'timezone', 'created', 'modified'];
        var parametersType = ['string', 'string', 'boolean', 'string', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];
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
        TweakPublicV1Customer.build = function (data) {
            return new TweakPublicV1Customer(data);
        };

        TweakPublicV1Customer.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPublicV1Customer.build).filter(Boolean);
            }
            return TweakPublicV1Customer.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPublicV1Customer;
    }
})();