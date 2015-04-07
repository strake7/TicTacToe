/**
 * Custom knockout extensions
 */
ko.bindingHandlers.element = {
	init: function(element, valueAccessor){
		var value = valueAccessor();
		value(element);
	}
};


/*
 * Custom knockout alidation extensions
 */
ko.validation.rules['notEqual'] = {
    validator: function (val, otherVal) {
        return val !== otherVal;
    },
    message: 'The field cannot equal {0}'
};
ko.validation.registerExtenders();