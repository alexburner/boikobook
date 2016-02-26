/**
 * Main app
 * Page template handler
 *
 * Built using Revealing Module Pattern
 * ~ more info @ http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 */

var app = (function () {

	/**
	 * Handle all the template tags within an element
	 * 1. Find template tags
	 * 2. For each:
	 * 		a. Request template HTML
	 *   	b. Request template JSON
	 *    	c. Build template
	 * 
	 * @param  {Node} el 	DOM element to search for template tags
	 */
	function handleTemplateTags(el) {

		// search element for children with "data-template" attribute
		var templateEls = el.querySelectorAll('[data-template]');

		// process every child element found
		for (var i = 0, l = templateEls.length; i < l; i++) {
			var templateEl = templateEls[i];
			var templateName = templateEl.getAttribute('data-template');
			requestTemplateHTML(templateName, templateEl);
		}

	}

	/**
	 * Request HTML for template
	 * -> then pass along to requestJSON
	 * 
	 * @param  {String} templateName 	Name of template
	 * @param  {Node} templateEl   		Template container
	 */
	function requestTemplateHTML(templateName, templateEl) {
		util.simpleXHR({
			method: 'GET',
			url: '/templates/' + templateName,
			success: function (xhr) {
				var templateHTML = xhr.responseText;
				requestTemplateJSON(
					templateName,
					templateEl,
					templateHTML
				);
			},
			error: function (xhr) {
				// no template html returned
				// nothing to do
			}
		});
	}

	/**
	 * Request JSON for template
	 * -> then pass along to buildTemplate
	 * 
	 * @param  {String} templateName 	Name of template
	 * @param  {Node} templateEl   		Template container
	 * @param  {String} templateHTML 	Template HTML string
	 */
	function requestTemplateJSON(templateName, templateEl, templateHTML) {
		util.simpleXHR({
			method: 'GET',
			url: '/json/' + templateName,
			success: function (xhr) {
				var responseJSON = util.safeParseJSON(xhr.responseText);
				var templateJSON = responseJSON.data;
				buildTemplate(
					templateEl,
					templateHTML,
					templateJSON
				);
			},
			error: function (xhr) {
				// no template json returned
				// build template with no data
				buildTemplate(
					templateEl,
					templateHTML,
					{}
				);
			}
		});
	}

	/**
	 * Compile template HTML and JSON together
	 * Then insert into container element
	 * And recursively check for child templates
	 * 
	 * @param  {Node} templateEl   		Template container
	 * @param  {String} templateHTML 	Template HTML string
	 * @param  {Object} templateJSON 	Template JSON object
	 */
	function buildTemplate(templateEl, templateHTML, templateJSON) {
		// compile template HTML and JSON into HTML
		// ~ more info @ http://underscorejs.org/#template
		var templateFunction = _.template(templateHTML);
		var compiledHTML = templateFunction(templateJSON);
		// append compiled HTML to template element
		templateEl.innerHTML = compiledHTML;
		// recursively handle child templates
		handleTemplateTags(templateEl);
	}



	/**
	 * Public interface
	 */
	return {
		handleTemplateTags: handleTemplateTags
	};

})();