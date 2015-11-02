declare module wu {

    interface MenuListProps {
        items: Array<MenuItemData>;
    }

    interface MenuProps {
        items: Array<MenuItemData>;
    }

    interface MenuListItemProps {
        text: string;
        icon?: string;
    }

    interface MenuItemData {
        text: string;
        icon?: string;
    }
}

