export interface ShipOrder {
    orderNumber: string,
    orderKey?: string,
    orderDate: string,
    paymentDate?: string,
    shipByDate?: string,
    orderStatus: string,
    customerId?: string,
    customerUsername?: string,
    customerEmail?: string,
    billTo: {
        name: string,
        company?: string,
        street1: string,
        street2?: string,
        street3?: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        phone: string,
        residential?: boolean
    },
    shipTo: {
        name: string,
        company?: string,
        street1: string,
        street2?: string,
        street3?: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        phone: string,
        residential?: boolean
    },
    items?: Item[],
    amountPaid?: number,
    taxAmount?: number,
    shippingAmount?: number,
    customerNotes?: string,
    internalNotes?: string,
    gift?: boolean,
    giftMessage?: string,
    paymentMethod?: string,
    requestedShippingService?: string,
    carrierCode?: string,
    serviceCode?: string,
    packageCode?: string,
    confirmation?: string,
    shipDate?: string,
    weight?: {
        value: number,
        units: string
    },
    dimensions?: {
        units: string,
        length: number,
        width: number,
        height: number
    },
    insuranceOptions?: {
        provider: string,
        insureShipment: boolean,
        insuredValue: number
    }
}

export interface Item {
    lineItemKey?: string,
    sku: string,
    name: string,
    imageUrl?: string,
    weight?: {
        value: number,
        units: string
    },
    quantity: number,
    unitPrice: number,
    taxAmount?: number,
    shippingAmount?: number,
    warehouseLocation?: string,
    options?: [
        {
            name: string,
            value: string
        }
    ],
    productId?: number,
    fulfillmentSku?: string,
    adjustment?: boolean,
    upc?: string
}