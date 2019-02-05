export default class TabsPage {
  constructor({ element }) {
    this._element = element;
    this.tabsMap = {};
    this._getTabsDetails();
    this._render();

    const tabView = this._element.querySelector('[data-tab-view]');
    const eventCustom = new CustomEvent('tab-selected');
    let tabClicked = Object.keys(this.tabsMap)[0];

    this._element.addEventListener('click', (event) => {
      const tabClickedItem = event.target.closest('[data-tab-item]');
      if (!tabClickedItem) { return; }
      tabClicked = tabClickedItem.dataset.tabItem;
      this._element.dispatchEvent(eventCustom);
    });

    this._element.addEventListener('tab-selected', () => {
      tabView.innerHTML = this.tabsMap[tabClicked];
    });
    this._element.dispatchEvent(eventCustom);
  }

  _getTabsDetails() {
    const tabDetailsAll = this._element.querySelectorAll('tab');
    tabDetailsAll.forEach((tabDetail) => {
      this.tabsMap[tabDetail.title] = tabDetail.textContent;
    });
  }

  _render() {
    this._element.innerHTML = `   
    <br /> 
    <ul class="tab__list" data-tabs-list>
      ${Object.keys(this.tabsMap).map(key => `
        <li class="tab__item" data-tab-item="${key}">${key}</li>
      `).join('')}
    </ul>
    <span class="tab__snippet" data-tab-view></span>
    <br />
    <br />
    `;
  }
}
