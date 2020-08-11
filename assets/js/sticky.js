(function($) {
  
  var bottomOffset = 150;
  
  // Do our DOM lookups beforehand
  var container = $("article");
  
  // Scrolling into top of article
  container.waypoint({
    handler: whenTopOfSection
  });
  
  // Scrolling into bottom of article
  container.waypoint({
    offset: bottomSectionOffset,
    handler: whenBottomOfSection
  });
  
  function bottomSectionOffset() {
    return -($(this).height() - bottomOffset);
  }
  
  function whenTopOfSection(direction) {
    $(this).toggleClass('sticky', direction != 'up')
  }
  
  function whenBottomOfSection(direction) {
    $(this).toggleClass('hide', direction != 'up')
  }

})(jQuery);