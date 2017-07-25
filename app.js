"use strict";
var App = (function () {
    function App() {
        this.el = '#app';
        this.data = {
            treeData: {
                name: 'Россия',
                isColumn: false,
                children: [
                    { name: 'Башкортостан', isColumn: false },
                    { name: 'Самарская область', isColumn: false },
                    {
                        name: 'Татарстан',
                        isColumn: false,
                        children: [
                            {
                                name: 'Казань',
                                isColumn: false,
                                children: [
                                    { name: 'Кольцо', isColumn: false },
                                    { name: 'Парк Хаус', isColumn: false }
                                ]
                            },
                            { name: 'Нижнекамск', isColumn: false },
                            { name: 'Бугульма', isColumn: false },
                            {
                                name: 'Альметьевск',
                                isColumn: false,
                                children: [
                                    { name: 'Панорама', isColumn: false },
                                    { name: 'Западный', isColumn: false }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
        this.components = {
            item: new Item(),
            flex: new Flex(),
        };
    }
    return App;
}());
var Item = (function () {
    function Item() {
        this.template = '#item-template';
        this.props = {
            index: Number,
            model: Object
        };
        this.components = {};
        this.computed = {
            isFolder: function () {
                return this.model.children && this.model.children.length > 0;
            }
        };
        this.methods = {
            toggle: function () {
                if (this.isFolder) {
                    this.open = !this.open;
                }
            },
            changeType: function () {
                if (this.isFolder) {
                    this.$set(this.model, 'children', null);
                    this.open = false;
                    this.isFolder = false;
                }
                else {
                    this.$set(this.model, 'children', []);
                    this.addChild();
                    this.open = true;
                    this.isFolder = true;
                }
            },
            addChild: function () {
                this.model.children.push({
                    name: prompt('Введите название города?', 'Неизвестно'),
                    isColumn: false
                });
            },
            removeChild: function () {
                this.$parent.$emit('removeChild', this.index);
            },
            onRemoveChild: function (index) {
                if (this.isFolder) {
                    this.model.children.splice(index, 1);
                }
            },
            moveChildUp: function () {
                this.$parent.$emit('moveChildUp', this.index);
            },
            onMoveChildUp: function (index) {
                var removed;
                if (this.isFolder) {
                    removed = this.model.children.splice(index, 1);
                    this.model.children.splice(index - 1, 0, removed[0]);
                }
            },
            moveChildDown: function () {
                this.$parent.$emit('moveChildDown', this.index);
            },
            onMoveChildDown: function (index) {
                var removed;
                if (this.isFolder) {
                    removed = this.model.children.splice(index, 1);
                    this.model.children.splice(index + 1, 0, removed[0]);
                }
            },
            moveLevelUpBefore: function () {
                this.$parent.$emit('moveLevelUpBefore', this.index);
            },
            onMoveLevelUpBefore: function (index) {
                this.$parent.$emit('moveSiblingBefore', this.index, index);
            },
            moveLevelUpAfter: function () {
                this.$parent.$emit('moveLevelUpAfter', this.index);
            },
            onMoveLevelUpAfter: function (index) {
                this.$parent.$emit('moveSiblingAfter', this.index, index);
            },
            moveSiblingBefore: function (index) {
                this.$parent.$emit('moveSiblingBefore', this.index, index);
            },
            onMoveSiblingBefore: function (index, childIndex) {
                var removed;
                if (this.isFolder) {
                    removed = this.model.children[index].children.splice(childIndex, 1);
                    this.model.children.splice(index - 1, 0, removed[0]);
                }
            },
            moveSiblingAfter: function (index) {
                this.$parent.$emit('moveSiblingAfter', this.index, index);
            },
            onMoveSiblingAfter: function (index, childIndex) {
                var removed;
                if (this.isFolder) {
                    removed = this.model.children[index].children.splice(childIndex, 1);
                    this.model.children.splice(index + 1, 0, removed[0]);
                }
            },
            moveToSiblingBefore: function () {
                this.$parent.$emit('moveToSiblingBefore', this.index);
            },
            onMoveToSiblingBefore: function (index) {
                var removed, children;
                if (this.isFolder) {
                    removed = this.model.children.splice(index, 1);
                    if (!this.model.children[index - 1].children) {
                        this.$set(this.model.children[index - 1], 'children', []);
                    }
                    this.model.children[index - 1].children.push(removed[0]);
                    this.$children[index - 1].open = true;
                }
            },
            moveToSiblingAfter: function () {
                this.$parent.$emit('moveToSiblingAfter', this.index);
            },
            onMoveToSiblingAfter: function (index) {
                var removed, children;
                if (this.isFolder) {
                    removed = this.model.children.splice(index, 1);
                    if (!this.model.children[index].children) {
                        this.$set(this.model.children[index], 'children', []);
                    }
                    this.model.children[index].children.push(removed[0]);
                    this.$children[index].open = true;
                }
            }
        };
    }
    Item.prototype.data = function () {
        return {
            open: false
        };
    };
    Item.prototype.created = function () {
        this.$on('removeChild', this.onRemoveChild);
        this.$on('moveChildUp', this.onMoveChildUp);
        this.$on('moveChildDown', this.onMoveChildDown);
        this.$on('moveLevelUpBefore', this.onMoveLevelUpBefore);
        this.$on('moveLevelUpAfter', this.onMoveLevelUpAfter);
        this.$on('moveSiblingBefore', this.onMoveSiblingBefore);
        this.$on('moveSiblingAfter', this.onMoveSiblingAfter);
        this.$on('moveToSiblingBefore', this.onMoveToSiblingBefore);
        this.$on('moveToSiblingAfter', this.onMoveToSiblingAfter);
        this.$options.components.item = this.$parent.$options.components.item;
    };
    return Item;
}());
var Flex = (function () {
    function Flex() {
        this.template = '#flex-template';
        this.props = {
            index: Number,
            model: Object
        };
        this.computed = {
            isFolder: function () {
                return this.model.children && this.model.children.length > 0;
            }
        };
    }
    Flex.prototype.data = function () {
        return {
            open: false,
            isFolder: true
        };
    };
    Flex.prototype.created = function () {
        this.$options.components.flex = this.$parent.$options.components.flex;
    };
    return Flex;
}());
