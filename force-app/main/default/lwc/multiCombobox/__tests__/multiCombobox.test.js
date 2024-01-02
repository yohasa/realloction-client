import MultiCombobox from 'c/multiCombobox';
import { createElement } from 'lwc';

const mockData = require('./data/multiCombobox.json');

let element;

describe('c-multi-combobox', () => {
  beforeEach(() => {
    element = createElement('c-multi-combobox', {
      is: MultiSelectCombobox
    });
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it('should be accessible and show combobox label', async () => {
    // given
    element.label = mockData.label;
    element.name = mockData.name;
    element.placeholder = mockData.placeholder;
    element.options = mockData.options;
    element.singleSelect = mockData.singleSelect;
    element.showPills = mockData.showPills;

    // when
    document.body.appendChild(element);
    const label = element.shadowRoot.querySelector('label');

    // then
    expect(label.textContent).toBe(mockData.label);
    await expect(element).toBeAccessible();
  });

  it('should load correct number of child components', () => {
    // given
    element.label = mockData.label;
    element.name = mockData.name;
    element.placeholder = mockData.placeholder;
    element.options = mockData.options;
    element.singleSelect = mockData.singleSelect;
    element.showPills = mockData.showPills;

    // when
    document.body.appendChild(element);
    const input = element.shadowRoot.querySelector('.multi-combobox__input');
    input.click();

    // then
    return Promise.resolve().then(() => {
      const itemList = element.shadowRoot.querySelectorAll('c-multi-combobox-item');
      expect(itemList.length).toBe(mockData.options.length);
    });
  });

  it('should fire click event when input is clicked', () => {
    // given
    const mockClickHandler = jest.fn();
    element.label = mockData.label;
    element.name = mockData.name;
    element.placeholder = mockData.placeholder;
    element.options = mockData.options;
    element.singleSelect = mockData.singleSelect;
    element.showPills = mockData.showPills;

    // when
    document.body.appendChild(element);
    const input = element.shadowRoot.querySelector('.multi-combobox__input');
    input.addEventListener('click', mockClickHandler);
    input.click();

    // then
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should fire change events when multiple options are selected', () => {
    // given
    const mockChangeHandler = jest.fn();
    element.label = mockData.label;
    element.name = mockData.name;
    element.placeholder = mockData.placeholder;
    element.options = mockData.options;
    element.singleSelect = mockData.singleSelect;
    element.showPills = mockData.showPills;

    // when
    document.body.appendChild(element);
    const input = element.shadowRoot.querySelector('.multi-combobox__input');
    input.click();

    // then
    return Promise.resolve().then(() => {
      // when
      const childs = element.shadowRoot.querySelectorAll('c-multi-combobox-item');
      childs.forEach((child, index) => {
        child.addEventListener('change', mockChangeHandler);
        child.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              item: { label: mockData.options[index].label, value: mockData.options[index].value, selected: true },
              selected: true
            }
          })
        );
      });

      // then
      expect(mockChangeHandler).toHaveBeenCalledTimes(mockData.options.length);
    });
  });

  it('should close the dropdown when option is selected while using single select configuration', () => {
    // given
    const mockCloseHandler = jest.fn();
    element.label = mockData.label;
    element.name = mockData.name;
    element.placeholder = mockData.placeholder;
    element.options = mockData.options;
    element.singleSelect = true;
    element.showPills = mockData.showPills;
    element.addEventListener('close', mockCloseHandler);

    // when
    document.body.appendChild(element);
    const input = element.shadowRoot.querySelector('.multi-combobox__input');
    input.click();

    // then
    return Promise.resolve().then(() => {
      // when
      const child = element.shadowRoot.querySelector('c-multi-combobox-item');
      child.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            item: { label: mockData.options[0].label, value: mockData.options[0].value, selected: true },
            selected: true
          }
        })
      );

      // then
      expect(mockCloseHandler).toHaveBeenCalledTimes(1);
    });
  });
});