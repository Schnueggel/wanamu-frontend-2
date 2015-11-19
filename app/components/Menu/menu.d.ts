declare module wu {

    interface MenuListProps {
        items: Array<MenuItemData>;
    }

    interface MenuProps {
        title: string;
        items: Array<MenuItemData>;
    }

    interface MenuListItemProps {
        key: any;
        text: string;
        icon?: string;
    }

    interface MenuItemData {
        text: string;
        icon?: string;
    }
}

