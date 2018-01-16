window.Emcien = window.Emcien || {};
window.Emcien.OutcomeOptions = (function () {
  /**
   * jQuery Selector for the Outcomes dropdown
   * @type {jQuery}
   * @private
   */
  var _outcomeSelect = $('#outcome-select');

  /**
   * Takes data about a specific item and returns a select option
   * @param item Item data for a specific item
   * @returns {HTMLElement} HTML element for a specific option
   * @private
   */
  var _buildOutcomeOption = function (item) {
    return $('<option>', {
      value: item.id,
      text: item.category_name + " is " + item.identifier
    });
  };

  return {
    /**
     * Updates the Outcomes dropdown with new values
     * @param outcomes
     */
    setOutcomeOptions: function (outcomes) {
      _outcomeSelect.append('<option value="" disabled selected hidden>Select One</option>');
      $.each(outcomes, function (i, item) {
        var option = _buildOutcomeOption(item);
        _outcomeSelect.append(option);
      });
    },

    /**
     * Clears the options listed in the outcome dropdown select
     */
    clearOutcomeOptions: function () {
      _outcomeSelect
        .find('option')
        .remove();
    }
  }
})();
