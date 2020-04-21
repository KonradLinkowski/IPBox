'use strict';
// tabs https://inclusive-components.design/tabbed-interfaces/
(function() {
  // Get relevant elements and collections
  const tabbed = document.querySelector('#tabs');
  const tablist = tabbed.querySelector('#tabs ul');
  const tabs = tablist.querySelectorAll('#tabs a');
  const panels = tabbed.querySelectorAll('#table, #map');
  
  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    const index = Array.prototype.indexOf.call(tabs, newTab);
    const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    window.location.hash = panels[index].id;
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
    tabs[index].focus();
  }
  
  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute('role', 'tablist');
  
  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');
    
    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', e => {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });
    
    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', e => {
      // Get the index of the current tab in the tabs node list
      const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      const dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });
  
  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true; 
  });
  
  // Initially activate the first tab and reveal the first tab panel
  const hashIndex = Array.prototype.findIndex.call(panels, panel => panel.id === window.location.hash.slice(1));
  const activePanel = hashIndex < 0 ? 0 : hashIndex;
  tabs[activePanel].removeAttribute('tabindex');
  tabs[activePanel].setAttribute('aria-selected', 'true');
  panels[activePanel].hidden = false;
})();
