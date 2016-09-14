import template from './result_table.html';
import controller from './result_table.controller';

const searchComponent = {
    template,
    controller,
    bindings: {items: '<', onDelete: '&'}
};

export default searchComponent;
