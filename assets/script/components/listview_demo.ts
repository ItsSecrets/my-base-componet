import { ListView, ListViewDir } from "./listview"

const { ccclass, property } = cc._decorator;

@ccclass
export default class ListView_Demo extends cc.Component {

    @property(cc.ScrollView)
    scrollview: cc.ScrollView;

    @property(cc.Node)
    mask: cc.Node;

    @property(cc.Node)
    content: cc.Node;

    @property(cc.Node)
    item_tpl: cc.Node;

    onLoad() {
        let list: ListView = new ListView({
            scrollview: this.scrollview,
            mask: this.mask,
            content: this.content,
            item_tpl: this.item_tpl,
            cb_host: this,
            item_setter: this.update_list_item,
            select_cb: this.on_item_select,
            column: 1,
            row: 1,
            direction: ListViewDir.Horizontal,
            scroll_to_end_cb: this.scroll_to_end_cb,
        });
        list.set_data([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
        ]);
    }


    list_item_setter(item: cc.Node, desc: any, index: number): void {

        //省略
    }
    on_item_select(data: any, index: number) {
        cc.info(data, index);
        console.log("=======on_item_select=========s");
    }

    update_list_item(item: cc.Node, data: any, index: number): void {
        item.getComponent(cc.Label).string = data.toString();

    }


    scroll_to_end_cb(event: any) {
        console.log("=======scroll_to_end_cb=========s");

    }
}
