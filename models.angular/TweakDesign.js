(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesign', TweakDesign);

    TweakDesign.$inject = ['$log'];

    function TweakDesign($log) {

        /**
         * Constructor, with class name
         * @param colors      {array}                   items: type: string    
         * @param image       {string}                  
         * @param name        {string}    [REQUIRED]    
         * @param object      {object}    [REQUIRED]    
         * @param thumbnail   {string}                  
         * @param expired     {string}                  format: date-time  
         * @param description {string}                  default:   
         * @param purpose     {string}                  default: none  enum: none, printOrder
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {number}                  format: double  
         * @param customerId  {number}                  format: double  
         * @param templateId  {number}                  format: double  
         * @param portalId    {number}                  format: double  
         * @param requesterId {number}                  format: double  
         * @param tags        {array}                   items: type: object    
         * @param customer    {object}                  
         * @param template    {object}                  
         * @param portal      {object}                  
         * @param requester   {object}                  
         * @param commenters  {array}                   items: type: object    
         * @param assignees   {array}                   items: type: object    
         * @param reviewers   {array}                   items: type: object    
         */
        function TweakDesign(colors, image, name, object, thumbnail, expired, description, purpose, created, modified, id, customerId, templateId, portalId, requesterId, tags, customer, template, portal, requester, commenters, assignees, reviewers) {
            this.colors = colors;
            this.image = image;
            this.name = name;
            this.object = object;
            this.thumbnail = thumbnail;
            this.expired = expired;
            this.description = description;
            this.purpose = purpose;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.customerId = customerId;
            this.templateId = templateId;
            this.portalId = portalId;
            this.requesterId = requesterId;
            this.tags = tags;
            this.customer = customer;
            this.template = template;
            this.portal = portal;
            this.requester = requester;
            this.commenters = commenters;
            this.assignees = assignees;
            this.reviewers = reviewers;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['colors', 'image', 'name', 'object', 'thumbnail', 'expired', 'description', 'purpose', 'created', 'modified', 'id', 'customerId', 'templateId', 'portalId', 'requesterId', 'tags', 'customer', 'template', 'portal', 'requester', 'commenters', 'assignees', 'reviewers'];
        var parametersType = ['array', 'string', 'string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'number', 'number', 'array', 'object', 'object', 'object', 'object', 'array', 'array', 'array'];
        var requiredParameters = ['name', 'object'];

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
        TweakDesign.build = function (data) {
            return new TweakDesign(
                data.colors,
                data.image,
                data.name,
                data.object,
                data.thumbnail,
                data.expired,
                data.description,
                data.purpose,
                data.created,
                data.modified,
                data.id,
                data.customerId,
                data.templateId,
                data.portalId,
                data.requesterId,
                data.tags,
                data.customer,
                data.template,
                data.portal,
                data.requester,
                data.commenters,
                data.assignees,
                data.reviewers
            );
        };

        TweakDesign.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesign.build).filter(Boolean);
            }
            return TweakDesign.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesign;
    }
})();