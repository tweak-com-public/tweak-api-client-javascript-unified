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
         * @param description {string}                  default:   
         * @param purpose     {string}                  default: none  enum: none, printOrder
         * @param status      {string}                  default: pendingAction  enum: pendingAction, pendingApproval, approved, rejected
         * @param edited      {string}                  format: date-time  
         * @param expired     {string}                  format: date-time  
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {string}                  
         * @param customerId  {string}                  
         * @param requesterId {string}                  
         * @param assigneeId  {string}                  
         * @param reviewerId  {string}                  
         * @param templateId  {string}                  
         * @param portalId    {string}                  
         * @param folderId    {string}                  
         * @param tags        {array}                   items: $ref: #/definitions/Tag    
         * @param customer    {string}                  $ref: #/definitions/Customer  
         * @param template    {string}                  $ref: #/definitions/Template  
         * @param portal      {string}                  $ref: #/definitions/Portal  
         * @param comments    {array}                   items: $ref: #/definitions/DesignComment    
         * @param exports     {array}                   items: $ref: #/definitions/DesignExport    
         * @param requester   {string}                  $ref: #/definitions/TeamMember  
         * @param assignee    {string}                  $ref: #/definitions/TeamMember  
         * @param reviewer    {string}                  $ref: #/definitions/TeamMember  
         * @param commenters  {array}                   items: $ref: #/definitions/TeamMember    
         * @param folder      {string}                  $ref: #/definitions/DesignFolder  
         */
        function TweakDesign(colors, image, name, object, thumbnail, description, purpose, status, edited, expired, created, modified, id, customerId, requesterId, assigneeId, reviewerId, templateId, portalId, folderId, tags, customer, template, portal, comments, exports, requester, assignee, reviewer, commenters, folder) {
            this.colors = colors;
            this.image = image;
            this.name = name;
            this.object = object;
            this.thumbnail = thumbnail;
            this.description = description;
            this.purpose = purpose;
            this.status = status;
            this.edited = edited;
            this.expired = expired;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.customerId = customerId;
            this.requesterId = requesterId;
            this.assigneeId = assigneeId;
            this.reviewerId = reviewerId;
            this.templateId = templateId;
            this.portalId = portalId;
            this.folderId = folderId;
            this.tags = tags;
            this.customer = customer;
            this.template = template;
            this.portal = portal;
            this.comments = comments;
            this.exports = exports;
            this.requester = requester;
            this.assignee = assignee;
            this.reviewer = reviewer;
            this.commenters = commenters;
            this.folder = folder;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['colors', 'image', 'name', 'object', 'thumbnail', 'description', 'purpose', 'status', 'edited', 'expired', 'created', 'modified', 'id', 'customerId', 'requesterId', 'assigneeId', 'reviewerId', 'templateId', 'portalId', 'folderId', 'tags', 'customer', 'template', 'portal', 'comments', 'exports', 'requester', 'assignee', 'reviewer', 'commenters', 'folder'];
        var parametersType = ['array', 'string', 'string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'string', 'string', 'string', 'array', 'array', 'string', 'string', 'string', 'array', 'string'];
        var requiredParameters = ['name', 'object'];

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
        TweakDesign.build = function (data) {
            return new TweakDesign(
                data.colors,
                data.image,
                data.name,
                data.object,
                data.thumbnail,
                data.description,
                data.purpose,
                data.status,
                data.edited,
                data.expired,
                data.created,
                data.modified,
                data.id,
                data.customerId,
                data.requesterId,
                data.assigneeId,
                data.reviewerId,
                data.templateId,
                data.portalId,
                data.folderId,
                data.tags,
                data.customer,
                data.template,
                data.portal,
                data.comments,
                data.exports,
                data.requester,
                data.assignee,
                data.reviewer,
                data.commenters,
                data.folder
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