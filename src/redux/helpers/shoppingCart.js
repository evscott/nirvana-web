function collapseItems(items) {
    // Collapse items to distinct product and denomination
    let collapsedItems = items.filter((item, index, self) =>
        index === self.findIndex((i) => (
            i.name === item.name && i.denomination === item.denomination
        ))
    );

    // Add a quantity property to each item
    collapsedItems = collapsedItems.map(item => {
        return {
            ...item,
            quantity: items.reduce((quantity, i) =>
                quantity + (item.name === i.name && item.denomination === i.denomination), 0),
        }
    });

    // Add a subtotal property to each item
    collapsedItems = collapsedItems.map(item => {
        return {
            ...item,
            subtotal: item.cost * item.quantity,
        }
    });

    return collapsedItems;
}

export function getSummaryData(items) {
    return {
        numberOfDistinctItems: items.length,
        subtotal: items.reduce(((subtotal, item) => subtotal+item.cost), 0),
        collapsedItems: collapseItems(items),
    }
}