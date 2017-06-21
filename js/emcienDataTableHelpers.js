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
    var maxCategoryOutcomeImpact = Math.max.apply(null, impacts);
    var str = '<tr><td class="text-center active">Impact</td>';
    $.each(impacts, function (i, impact) {
      var categoryOutcomeImpactPct = Math.round(impact * 100 / maxCategoryOutcomeImpact);
      str += _categoryOutcomeImpactHtml(categoryOutcomeImpactPct);
    });
    str += '</tr>';
    return str
  };

  /**
   * Generates the markup for fontawesome icons to represent the impact
   * @param {number} categoryOutcomeImpactPct A number from 0 - 100 of the impact
   * @returns {string} HTML markup with FontAwesome icons of the circles
   * @private
   */
  var _categoryOutcomeImpactHtml = function(categoryOutcomeImpactPct) {
    var str = '<td class="data-table-dots">';

    var fullCircles = Math.floor(categoryOutcomeImpactPct / 20);
    for (var x = 0; x < fullCircles; x++) {
      str += '<i class="fa fa-circle" aria-hidden="true"></i>'
    }

    var halfCircle = (categoryOutcomeImpactPct % 20) >= 10;
    if (halfCircle) {
      str += '<i class="fa fa-adjust fa-rotate-180" aria-hidden="true"></i>'
    }

    var emptyCircles = 5 - fullCircles - halfCircle;
    for (var y = 0; y < emptyCircles; y++) {
      str += '<i class="fa fa-circle-o" aria-hidden="true"></i>'
    }

    str += '</td>';
    return str;
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
    var maxImpacts = _maxImpacts(itemDrivers);

    for (var y = 0; y < 5; y++) {
      str += '<tr><td class="text-center active">' + (y + 1) + '</td>';
      for (var x = 0; x < itemDrivers.length; x++) {
        var topDrivers = itemDrivers[x] || [];
        var driver = topDrivers[y] || {};
        var impactRatio = (driver.impact_size / maxImpacts[x]) || 0;
        str += '<td style="' + _itemDriverRowCss(impactRatio) + '">' + (driver.item_name || '') + '</td>';
      }
      str += '</tr>';
    }
    return str;
  };

  /**
   * Takes an array of arrays of item drivers. Figures out the max impact for each and returns them
   * @param {Array} itemDrivers Item driver data for a particular outcome
   * @returns {Array} A corresponding array of numbers of the max impact of any item driver
   * @private
   */
  var _maxImpacts = function (itemDrivers) {
    return $.map(itemDrivers, function(ids) {
      if (ids.length === 0) {
        return 0
      }
      var impacts = $.map(ids, function(id) { return id.impact_size });
      return Math.max.apply(null, impacts);
    });
  };

  /**
   * Generates the css markup for an item driver cell. Names the horizontal fill
   * @param {number} fraction A fraction from 0.0 - 1.0 of how much of the cell should be filled
   * @returns {string} CSS markup that should be attached to the cell
   * @private
   */
  var _itemDriverRowCss = function (fraction) {
    var percentage = fraction * 100;
    var color = '#f1f1f1';
    return (
      'background: -webkit-linear-gradient(left, ' + color + ' ' + percentage + '%,#ffffff ' + percentage + '%);' +
      'background: -moz-linear-gradient(left, ' + color + ' ' + percentage + '%,#ffffff ' + percentage + '%);' +
      'background: -ms-linear-gradient(left, ' + color + ' ' + percentage + '%,#ffffff ' + percentage + '%);' +
      'background: -o-linear-gradient(left, ' + color + ' ' + percentage + '%,#ffffff ' + percentage + '%);' +
      'background: linear-gradient(to right, ' + color + ' ' + percentage + '%,#ffffff ' + percentage + '%);'
    )
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
