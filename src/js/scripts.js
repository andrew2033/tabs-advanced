import TabsPage from './tabsPage/tabsPage.js';

const tabsMap = document.querySelectorAll('[data-tabs]');

tabsMap.forEach((tabs) => {
  const currentTabs = new TabsPage({
    element: tabs,
  });
});
