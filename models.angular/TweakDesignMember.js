(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignMember', TweakDesignMember);

    TweakDesignMember.$inject = ['$log'];

    function TweakDesignMember($log) {

        /**
         * Constructor, with class name
         * @param canEdit  {boolean}   default: false  
         * @param created  {string}    format: date-time  
         * @param modified {string}    format: date-time  
         * @param id       {string}    
         * @param designId {string}    
         * @param memberId {string}    
         * @param design   {object}    $ref: #/definitions/Design  
         * @param member   {object}    $ref: #/definitions/TeamMember  
         */
        function TweakDesignMember(data) {
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
        var parameters = ['canEdit', 'created', 'modified', 'id', 'designId', 'memberId', 'design', 'member'];
        var parametersType = ['boolean', 'string', 'string', 'string', 'string', 'string', 'object', 'object'];
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
        TweakDesignMember.build = function (data) {
            return new TweakDesignMember(data);
        };

        TweakDesignMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignMember.build).filter(Boolean);
            }
            return TweakDesignMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignMember;
    }
})();