(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakQTask', TweakQTask);

    TweakQTask.$inject = ['$log'];

    function TweakQTask($log) {

        /**
         * Constructor, with class name
         * @param chain     {array}     items: type: string    
         * @param events    {array}     default: items: type: object    
         * @param status    {string}    default: queued  
         * @param params    {object}    
         * @param queue     {string}    default: default  
         * @param count     {number}    default: 0  format: double  
         * @param attempts  {number}    default: 5  format: double  
         * @param remaining {number}    default: 5  format: double  
         * @param delay     {string}    format: date-time  
         * @param priority  {number}    default: 0  format: double  
         * @param ended     {string}    format: date-time  
         * @param enqueued  {string}    format: date-time  
         * @param result    {object}    
         * @param error     {object}    
         * @param stack     {object}    
         * @param id        {number}    format: double  
         * @param itemId    {number}    format: double  
         * @param itemType  {string}    
         */
        function TweakQTask(data) {
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
        var parameters = ['chain', 'events', 'status', 'params', 'queue', 'count', 'attempts', 'remaining', 'delay', 'priority', 'ended', 'enqueued', 'result', 'error', 'stack', 'id', 'itemId', 'itemType'];
        var parametersType = ['array', 'array', 'string', 'object', 'string', 'number', 'number', 'number', 'string', 'number', 'string', 'string', 'object', 'object', 'object', 'number', 'number', 'string'];
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
        TweakQTask.build = function (data) {
            return new TweakQTask(data);
        };

        TweakQTask.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakQTask.build).filter(Boolean);
            }
            return TweakQTask.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakQTask;
    }
})();