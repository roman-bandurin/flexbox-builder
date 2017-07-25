import { treeNode, ItemOptions, ItemComponent, FlexOptions, FlexComponent } from './app.d'

class App {
  el: string = '#app'

  data: { treeData: treeNode } = {
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
  }

  components = {
    item: new Item(),
    flex: new Flex(),
  }
}

class Item implements ItemOptions {
  template = '#item-template'

  props = {
    index: Number,
    model: Object
  }

  data(): { open: boolean } {
    return {
      open: false
    }
  }

  components = {}

  computed = {
    isFolder: function (this: ItemComponent): boolean {
      return this.model.children && this.model.children.length > 0
    }
  }

  methods = {
    toggle(this: ItemComponent): void {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType(this: ItemComponent): void {
      if (this.isFolder) {
        this.$set(this.model, 'children', null)
        this.open = false
        this.isFolder = false
      } else {
        this.$set(this.model, 'children', [])
        this.addChild()
        this.open = true
        this.isFolder = true
      }
    },
    addChild(this: ItemComponent): void {
      this.model.children.push({
        name: prompt('Введите название города?', 'Неизвестно'),
        isColumn: false
      } as treeNode)
    },

    removeChild(this: ItemComponent): void {
      this.$parent.$emit('removeChild', this.index)
    },
    onRemoveChild(this: ItemComponent, index: number): void {
      if (this.isFolder) {
        this.model.children.splice(index, 1)
      }
    },

    moveChildUp(this: ItemComponent): void {
      this.$parent.$emit('moveChildUp', this.index)
    },
    onMoveChildUp(this: ItemComponent, index: number) : void {
      var removed;
      if (this.isFolder) {
        removed = this.model.children.splice(index, 1)
        this.model.children.splice(index - 1, 0, removed[0])
      }
    },

    moveChildDown(this: ItemComponent): void {
      this.$parent.$emit('moveChildDown', this.index)
    },
    onMoveChildDown(this: ItemComponent, index: number): void {
      var removed;
      if (this.isFolder) {
        removed = this.model.children.splice(index, 1)
        this.model.children.splice(index + 1, 0, removed[0])
      }
    },

    moveLevelUpBefore(this: ItemComponent): void {
      this.$parent.$emit('moveLevelUpBefore', this.index)
    },
    onMoveLevelUpBefore(this: ItemComponent, index: number): void {
      this.$parent.$emit('moveSiblingBefore', this.index, index)
    },

    moveLevelUpAfter(this: ItemComponent): void {
      this.$parent.$emit('moveLevelUpAfter', this.index)
    },
    onMoveLevelUpAfter(this: ItemComponent, index: number): void {
      this.$parent.$emit('moveSiblingAfter', this.index, index)
    },

    moveSiblingBefore(this: ItemComponent, index: number): void {
      this.$parent.$emit('moveSiblingBefore', this.index, index)
    },
    onMoveSiblingBefore(this: ItemComponent, index: number, childIndex: number): void {
      var removed;
      if (this.isFolder) {
        removed = this.model.children[index].children.splice(childIndex, 1)
        this.model.children.splice(index - 1, 0, removed[0])
      }
    },

    moveSiblingAfter(this: ItemComponent, index: number): void {
      this.$parent.$emit('moveSiblingAfter', this.index, index)
    },
    onMoveSiblingAfter(this: ItemComponent, index: number, childIndex: number): void {
      var removed;
      if (this.isFolder) {
        removed = this.model.children[index].children.splice(childIndex, 1)
        this.model.children.splice(index + 1, 0, removed[0])
      }
    },

    moveToSiblingBefore(this: ItemComponent): void {
      this.$parent.$emit('moveToSiblingBefore', this.index)
    },
    onMoveToSiblingBefore(this: ItemComponent, index: number): void {
      var removed, children;
      if (this.isFolder) {
        removed = this.model.children.splice(index, 1)

        if (!this.model.children[index - 1].children) {
          this.$set(this.model.children[index - 1], 'children', [])
        }
        this.model.children[index - 1].children.push(removed[0])
        this.$children[index - 1].open = true
      }
    },

    moveToSiblingAfter(this: ItemComponent): void {
      this.$parent.$emit('moveToSiblingAfter', this.index)
    },
    onMoveToSiblingAfter(this: ItemComponent, index: number): void {
      var removed, children;
      if (this.isFolder) {
        removed = this.model.children.splice(index, 1)
        if (!this.model.children[index].children) {
          this.$set(this.model.children[index], 'children', [])
        }
        this.model.children[index].children.push(removed[0])
        this.$children[index].open = true
      }
    }
  }

  created(this: ItemComponent) {
    this.$on('removeChild', this.onRemoveChild)
    this.$on('moveChildUp', this.onMoveChildUp)
    this.$on('moveChildDown', this.onMoveChildDown)
    this.$on('moveLevelUpBefore', this.onMoveLevelUpBefore)
    this.$on('moveLevelUpAfter', this.onMoveLevelUpAfter)
    this.$on('moveSiblingBefore', this.onMoveSiblingBefore)
    this.$on('moveSiblingAfter', this.onMoveSiblingAfter)
    this.$on('moveToSiblingBefore', this.onMoveToSiblingBefore)
    this.$on('moveToSiblingAfter', this.onMoveToSiblingAfter)
    this.$options.components.item = this.$parent.$options.components.item;
  }
}

class Flex implements FlexOptions {
  template = '#flex-template'

  props = {
		index: Number,
		model: Object
  }

  data(): { open: boolean, isFolder: boolean } {
    return {
      open: false,
      isFolder: true
    }
  }

  computed = {
    isFolder: function (this: FlexComponent): boolean {
      return this.model.children && this.model.children.length > 0
    }
  }

  created(this: FlexComponent) {
    this.$options.components.flex = this.$parent.$options.components.flex;
  }
}
