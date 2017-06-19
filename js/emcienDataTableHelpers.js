window.Emcien = window.Emcien || {};
window.Emcien.DataTableHelpers = (function () {
  /**
   * jQuery Selector for the data table
   * @type {jQuery}
   * @private
   */
  var _dataTable = $('#data-table');

  /**
   * Takes data from the API and returns the category outcome impacts
   * @param data Data from the API
   * @returns {Array} Returns the category outcome impacts
   * @private
   */
  var _categoryOutcomeImpacts = function (data) {
    return $.map(data, function (elem) {
      return elem.category_outcome_impact
    });
  };

  /**
   * Takes impact values and returns a table with its HTML representation
   * @param impacts
   * @returns {string} String representing HTML for a table row
   * @private
   */
  var _categoryOutcomeImpactsHtml = function (impacts) {
    var str = '<tr><td class="text-center active">Impact</td>';
    $.each(impacts, function (i, name) {
      str += '<td>' + name + '</td>';
    });
    str += '</tr>';
    return str

  };

  /**
   * Takes API data and returns an array of the category names
   * @param data
   * @returns {Array} Array of category names
   * @private
   */
  var _driverNames = function (data) {
    return $.map(data, function (elem) {
      return elem.category_name
    });
  };

  /**
   * Takes an array of names and returns a string HTML representation
   * @param {Array} Array of driver names
   * @returns {string} String HTML representation of a table row
   * @private
   */
  var _driverNamesHtml = function (names) {
    var str = '<tr class="active"><th></th>';
    $.each(names, function (i, name) {
      str += '<th>' + name + '</th>';
    });
    str += '</tr>';
    return str
  };

  /**
   * Takes API data and returns the top_item_drivers
   * @param data API ata
   * @returns {Array} Returns an array of top_item_drivers
   * @private
   */
  var _itemDrivers = function (data) {
    return $.map(data, function (elem) {
      return [elem.top_item_drivers];
    });
  };

  /**
   * Takes item driver data and returns HTML data
   * @param {Array} itemDrivers Item driver data from the API
   * @returns {string} HTML representation of table data
   * @private
   */
  var _itemDriverRowsHtml = function (itemDrivers) {
    var str = '';
    for (var x = 0; x < 5; x++) {
      str += '<tr><td class="text-center active">' + (x + 1) + '</td>';
      for (var y = 0; y < itemDrivers.length; y++) {
        var topDrivers = itemDrivers[y] || [];
        var topDriver = topDrivers[x] || {};
        var itemName = topDriver.item_name || '';
        str += '<td>' + itemName + '</td>';
      }
      str += '</tr>';
    }
    return str;
  };

  return {
    /**
     * Clears the data in the table
     */
    clearDataTable: function () {
      _dataTable
        .find('tr')
        .remove()
    },
    /**
     * Takes API data and renders driver names
     * @param data API Data
     */
    renderDriverNames: function (data) {
      var names = _driverNames(data);
      var html = _driverNamesHtml(names);
      _dataTable
        .find('thead')
        .append(html);
    },
    /**
     * Takes API data and renders impact row
     * @param data API Data
     */
    renderImpactRow: function (data) {
      var categoryOutcomeImpacts = _categoryOutcomeImpacts(data);
      var html = _categoryOutcomeImpactsHtml(categoryOutcomeImpacts);
      _dataTable
        .find('tbody')
        .append(html);
    },
    /**
     * Takes API data and renders item driver rows
     * @param data API Data
     */
    renderItemDriverRows: function (data) {
      var itemDrivers = _itemDrivers(data);
      var html = _itemDriverRowsHtml(itemDrivers);
      _dataTable
        .find('tbody')
        .append(html)
    }
  }
})();
