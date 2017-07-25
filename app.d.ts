import Vue from './vue.d';

export declare type treeNode = {
	name: string
	isColumn: boolean
	children?: Array<treeNode>
}

export declare interface ItemComponent extends Vue {
	//data
	open: boolean

	//props
	index: number
	model: treeNode

	//computed
	isFolder: boolean

	//methods
	toggle(index: number)
	changeType()
	addChild()
	removeChild()
	onRemoveChild()
	moveChildUp()
	onMoveChildUp()
	moveChildDown()
	onMoveChildDown()
	moveLevelUpBefore()
	onMoveLevelUpBefore()
	moveLevelUpAfter()
	onMoveLevelUpAfter()
	moveSiblingBefore()
	onMoveSiblingBefore()
	moveSiblingAfter()
	onMoveSiblingAfter()
	moveToSiblingBefore()
	onMoveToSiblingBefore()
	moveToSiblingAfter()
	onMoveToSiblingAfter()

	$children: Array<this>
}

export declare interface ItemOptions {
	template: string

	props: {
		index: any,
		model : any
	}

	data(): {
		open: boolean
	}

	methods: {
		toggle(this: ItemComponent): void
		changeType(this: ItemComponent): void
		addChild(this: ItemComponent): void
		removeChild(this: ItemComponent): void
		moveChildUp(this: ItemComponent): void
		onMoveChildUp(this: ItemComponent, index: number): void
		moveChildDown(this: ItemComponent): void
		onMoveChildDown(this: ItemComponent, index: number): void
		moveLevelUpBefore(this: ItemComponent): void
		onMoveLevelUpBefore(this: ItemComponent, index: number): void
		moveLevelUpAfter(this: ItemComponent): void
		onMoveLevelUpAfter(this: ItemComponent, index: number): void
		moveSiblingBefore(this: ItemComponent, index: number): void
		onMoveSiblingBefore(this: ItemComponent, index: number, childIndex: number): void
		moveSiblingAfter(this: ItemComponent, index: number): void
		onMoveSiblingAfter(this: ItemComponent, index: number, childIndex: number): void
		moveToSiblingBefore(this: ItemComponent): void
		onMoveToSiblingBefore(this: ItemComponent, index: number): void
		moveToSiblingAfter(this: ItemComponent): void
		onMoveToSiblingAfter(this: ItemComponent, index: number): void
	}
}

export declare interface FlexComponent extends Vue {
	//data
	open: boolean

	//props
	index: number
	model: treeNode

	//computed
	isFolder: boolean

	$children: Array<this>
}

export declare interface FlexOptions {
	template: string

	props: {
		index: any,
		model : any
	}
}
